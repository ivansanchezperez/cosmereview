# Cosmereview 📚✨

A simple REST API backend for reviewing books, built with [Bun](https://bun.sh/), [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), [Supabase](https://supabase.com/dashboard/project/tbptoqmpxzhbnajchgho) PostgreSQL.

---

### 1. Create .env file

Create a `.env` file:

```env
DATABASE_URL=postgres://user:password@host:port/database
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the development server

```bash
bun run dev
```

### References

[Bun](https://bun.sh/)

[Supabase](https://supabase.com/dashboard/project/tbptoqmpxzhbnajchgho)

[Hono](https://hono.dev/)

[Drizzle ORM](https://orm.drizzle.team/)

### TODO

- Do I need CI and tests?
- Think were do we deploy this
- Maybe a metrics module? enchange entites for that
- Auth system implementation, do we need email support? resend for register use case
- How can I introduce a good documetation for the API (dbdocs looks good already)
