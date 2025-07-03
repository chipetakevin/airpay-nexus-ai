-- Update rica_registrations table to use text instead of uuid for user_id
ALTER TABLE public.rica_registrations 
ALTER COLUMN user_id TYPE text;

-- Update rica_registration_drafts table to use text instead of uuid for user_id  
ALTER TABLE public.rica_registration_drafts 
ALTER COLUMN user_id TYPE text;