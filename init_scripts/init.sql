DO
$$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'users_psg') THEN
      CREATE DATABASE users_psg;
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'review_psg') THEN
      CREATE DATABASE review_psg;
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'auth_psg') THEN
      CREATE DATABASE auth_psg;
   END IF;
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'product_psg') THEN
      CREATE DATABASE product_psg;
   END IF;
END
$$;
