-- Fix security warning: Set search_path for increment_thumbnail_views function
CREATE OR REPLACE FUNCTION public.increment_thumbnail_views(thumbnail_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.haley_thumbnails
  SET views = views + 1
  WHERE uuid = thumbnail_uuid;
END;
$$;