-- Add lines of code tracking to codebase versions
ALTER TABLE public.codebase_versions 
ADD COLUMN lines_of_code INTEGER NOT NULL DEFAULT 0,
ADD COLUMN file_extensions JSONB DEFAULT '{}';

-- Add comment for the new columns
COMMENT ON COLUMN public.codebase_versions.lines_of_code IS 'Total lines of code across all files in this version';
COMMENT ON COLUMN public.codebase_versions.file_extensions IS 'Count of files by extension (e.g., {"tsx": 45, "ts": 23, "css": 12})';

-- Update the capture function to include lines of code calculation
CREATE OR REPLACE FUNCTION public.capture_codebase_version(
  p_version_number TEXT,
  p_version_name TEXT,
  p_description TEXT DEFAULT NULL,
  p_file_contents JSONB DEFAULT '{}',
  p_is_stable BOOLEAN DEFAULT false
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  version_id UUID;
  file_count INTEGER;
  total_size BIGINT;
  lines_count INTEGER := 0;
  extensions_count JSONB := '{}';
  file_path TEXT;
  file_content TEXT;
  file_lines INTEGER;
  file_ext TEXT;
BEGIN
  -- Calculate file statistics
  SELECT 
    jsonb_object_length(p_file_contents),
    COALESCE(SUM(length(value::text)), 0)
  INTO file_count, total_size
  FROM jsonb_each_text(p_file_contents);
  
  -- Calculate lines of code and file extension distribution
  FOR file_path, file_content IN SELECT * FROM jsonb_each_text(p_file_contents) LOOP
    -- Count lines in this file
    file_lines := array_length(string_to_array(file_content, E'\n'), 1);
    lines_count := lines_count + COALESCE(file_lines, 0);
    
    -- Extract file extension
    file_ext := LOWER(COALESCE(substring(file_path from '\.([^.]+)$'), 'no-ext'));
    
    -- Update extension count
    extensions_count := jsonb_set(
      extensions_count,
      ARRAY[file_ext],
      to_jsonb(COALESCE((extensions_count->>file_ext)::INTEGER, 0) + 1)
    );
  END LOOP;
  
  -- Insert new version
  INSERT INTO public.codebase_versions (
    version_number,
    version_name,
    description,
    created_by,
    file_contents,
    file_count,
    total_size_bytes,
    lines_of_code,
    file_extensions,
    is_stable,
    commit_message
  ) VALUES (
    p_version_number,
    p_version_name,
    p_description,
    auth.uid(),
    p_file_contents,
    file_count,
    total_size,
    lines_count,
    extensions_count,
    p_is_stable,
    COALESCE(p_description, 'Version ' || p_version_number || ' snapshot')
  ) RETURNING id INTO version_id;
  
  RETURN version_id;
END;
$$;