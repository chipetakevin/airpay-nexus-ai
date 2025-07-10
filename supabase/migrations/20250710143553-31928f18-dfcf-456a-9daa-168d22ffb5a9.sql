-- Create storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Create storage policies for document uploads
CREATE POLICY "Users can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create table to track uploaded documents with metadata
CREATE TABLE public.uploaded_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    upload_status TEXT NOT NULL DEFAULT 'uploading',
    processing_status TEXT DEFAULT 'pending',
    classification TEXT,
    extracted_data JSONB,
    compliance_status TEXT DEFAULT 'pending',
    security_scan_status TEXT DEFAULT 'pending',
    metadata JSONB DEFAULT '{}',
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on uploaded_documents
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for uploaded_documents
CREATE POLICY "Users can manage their own documents" 
ON public.uploaded_documents 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all documents" 
ON public.uploaded_documents 
FOR ALL 
USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
));

-- Create trigger for updated_at
CREATE TRIGGER update_uploaded_documents_updated_at
    BEFORE UPDATE ON public.uploaded_documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();