## API Documentation

For detailed API documentation, please visit the following link:

[Postman API Documentation](https://documenter.getpostman.com/view/10628880/2sAYQiAn6f)


# Creating first Admin (Postgress)
```sql
-- Criar o laboratório e armazenar o ID retornado
WITH new_lab AS (
    INSERT INTO laboratories ("name", "logo", "createdAt", "updatedAt") 
    VALUES ('Laboratório Principal', 'logo_url.png', NOW(), NOW()) 
    RETURNING id
)
-- Criar o superadmin associado ao laboratório recém-criado
INSERT INTO users ("name", email, "password", "role", "createdAt", "updatedAt", "laboratoryId") 
SELECT 'Admin Master', 'admin@example.com', 
       '$2b$10$kDl6xuDtLOe80BRpHAuq0eSHm62h5eoIZXWzh/.csl.JL3TeRkoZS',  -- password123
       'Admin', NOW(), NOW(), id
FROM new_lab;
```