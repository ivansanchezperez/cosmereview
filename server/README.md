# Cosmereview 📚✨

A simple REST API backend for reviewing books, built with [Bun](https://bun.sh/), [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), and PostgreSQL.

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

Supabase: https://supabase.com/dashboard/project/tbptoqmpxzhbnajchgho

### TODO

- Add user entity
- Authentication middlware
- Handle images on books, ideas
- Do I need CI and tests?
- Think were do we deploy this
- Maybe a metrics module?
- Auth system implementation, do we need email support?
- How can I introduce a good documetation for the API
