
# Database Triggers - on_auth_user_created 
## Function 'handle_new_user' 

```sql
declare
  _username text;
  _full_name text;

begin
  -- Default username: email prefix + short user ID
  _username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9]+', '', 'g'))
               || '-' || substr(new.id::text, 1, 4);

  -- Use provided full name or fallback
  _full_name := coalesce(new.raw_user_meta_data->>'full_name', 'Anonymous User');

  -- Insert into authors table
  insert into public.authors (id, email, username, full_name)
  values (
    new.id,
    new.email,
    _username,
    _full_name
  );

  return new;
end;
```