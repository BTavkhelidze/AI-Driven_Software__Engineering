# AI Capability Definitions & Domain Map

To maximize generation speed and minimize architectural fragmentation, the AI must leverage these structural capabilities and core architectural patterns:

## 1. Reusable Domain Modules
- **Authentication Domain:** Centralized JWT verification service layer, token refresh cycles, encryption pipelines via bcrypt, and global React route guards (`<ProtectedRoute>`).
- **Catalog Domain:** Server-side parameterized search operations, dynamic SQL array querying for faceted categories, and cached state querying on the client using React Query.
- **Transactional Domain:** Database transaction isolation loops (`prisma.$transaction`) validating current stock values before writing an explicit order state to avoid double-allocation errors.

## 2. Shared Interface Maps (DTO Layer)
- Share typed contracts between frontend clients and backend service layers. Every endpoint must have corresponding structural request/response types.
- Never map raw, unprotected database schemas directly back to public API interfaces; filter fields cleanly (e.g., stripping password hashes from the final User entity payload).

## 3. UI Structural Framework
- Reusable component primitives (Buttons, Inputs, Modals, Skeletal Loaders) must be completely modular, stateless, and controlled explicitly via typed component props.