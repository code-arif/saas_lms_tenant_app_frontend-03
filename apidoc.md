# Course Categories API

> Base URL: `/api/v1/course-categories`
>
> Middleware: `api`, `auth:sanctum`, `role:super_admin|tenant`
>
> Content-Type: `application/json`

---

## Standard Response Envelope

All endpoints return responses in the following structure:

```json
{
  "success": true | false,
  "message": "string",
  "data": {} | [] | null,
  "meta": {},
  "errors": [],
  "pagination": null | {
    "total": 42,
    "per_page": 15,
    "current_page": 1,
    "last_page": 3
  }
}
```

---

## Authentication

All endpoints require a valid **Sanctum** Bearer token and one of the following roles: `super_admin` or `tenant`.

**Header:**
```
Authorization: Bearer {your_token}
Accept: application/json
```

---

## 1. List Categories (Paginated)

> `GET /api/v1/course-categories`

Retrieve a paginated list of course categories with optional filtering.

### Query Parameters

| Parameter    | Type    | Default | Description                                      |
|--------------|---------|---------|--------------------------------------------------|
| `per_page`   | integer | `15`    | Number of items per page (max not enforced)      |
| `is_active`  | boolean | —       | Filter by active status (`1`, `0`, `true`, `false`) |
| `parent_id`  | UUID    | —       | Filter by parent category UUID                   |
| `search`     | string  | —       | Search in `name` and `description` fields        |
| `page`       | integer | `1`     | Page number (sent automatically by paginator)    |

### Example Request

```
GET /api/v1/course-categories?per_page=10&is_active=1&search=web
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Course categories retrieved successfully",
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Development",
      "slug": "development",
      "description": "Learn programming languages, frameworks, and software development skills from beginner to advanced.",
      "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg",
      "color": "#4F46E5",
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-06-23T10:00:00Z",
      "updated_at": "2026-06-23T10:00:00Z",
      "parent": null,
      "children": [
        {
          "uuid": "550e8400-e29b-41d4-a716-446655440002",
          "name": "Web Development",
          "slug": "web-development",
          "description": "Build modern websites and web applications using HTML, CSS, JavaScript, React, Vue, and more.",
          "icon_url": "https://cdn-icons-png.flaticon.com/512/1199/1199124.png",
          "color": "#6366F1",
          "sort_order": 1,
          "is_active": true,
          "created_at": "2026-06-23T10:00:00Z",
          "updated_at": "2026-06-23T10:00:00Z",
          "parent": { "uuid": "...", "name": "Development" },
          "children": [],
          "courses_count": 0
        }
      ],
      "courses_count": 0
    }
  ],
  "meta": {},
  "errors": [],
  "pagination": {
    "total": 42,
    "per_page": 10,
    "current_page": 1,
    "last_page": 5
  }
}
```

> **Note:** `parent` is only present when the `parent` relation is loaded (always in `index`). `children` is always an array. `courses_count` is `0` when not loaded.

---

## 2. Get Category Tree

> `GET /api/v1/course-categories/tree`

Retrieve all **active top-level** categories (where `parent_id IS NULL`) with their **active children** nested inside. This is ideal for building navigation dropdowns, filter menus, or category selectors.

### Query Parameters

None.

### Example Request

```
GET /api/v1/course-categories/tree
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Course category tree retrieved successfully",
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Development",
      "slug": "development",
      "description": "Learn programming languages, frameworks, and software development skills.",
      "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg",
      "color": "#4F46E5",
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-06-23T10:00:00Z",
      "updated_at": "2026-06-23T10:00:00Z",
      "parent": null,
      "children": [
        {
          "uuid": "550e8400-e29b-41d4-a716-446655440002",
          "name": "Web Development",
          "slug": "web-development",
          "description": "Build modern websites and web applications.",
          "icon_url": "https://cdn-icons-png.flaticon.com/512/1199/1199124.png",
          "color": "#6366F1",
          "sort_order": 1,
          "is_active": true,
          "created_at": "2026-06-23T10:00:00Z",
          "updated_at": "2026-06-23T10:00:00Z",
          "parent": null,
          "children": [],
          "courses_count": 0
        }
      ],
      "courses_count": 0
    }
  ],
  "meta": {},
  "errors": [],
  "pagination": null
}
```

> **Note:** `parent` is `null` in the tree response for all items since the service only loads `children`. Only **active** categories are returned.

---

## 3. Get Single Category

> `GET /api/v1/course-categories/{uuid}`

Retrieve a single course category by its UUID (including soft-deleted is not possible — they are excluded).

### Path Parameters

| Parameter | Type | Description             |
|-----------|------|-------------------------|
| `uuid`    | UUID | The category's UUID     |

### Example Request

```
GET /api/v1/course-categories/550e8400-e29b-41d4-a716-446655440001
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Course category retrieved successfully",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Development",
    "slug": "development",
    "description": "Learn programming languages, frameworks, and software development skills.",
    "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg",
    "color": "#4F46E5",
    "sort_order": 1,
    "is_active": true,
    "created_at": "2026-06-23T10:00:00Z",
    "updated_at": "2026-06-23T10:00:00Z",
    "parent": null,
    "children": [],
    "courses_count": 0
  },
  "meta": {},
  "errors": [],
  "pagination": null
}
```

---

## 4. Create Category

> `POST /api/v1/course-categories/store`

Create a new course category.

### Request Body

| Field        | Type    | Required | Default  | Description                                        |
|--------------|---------|----------|----------|----------------------------------------------------|
| `name`       | string  | **Yes**  | —        | Category name (max 255 chars)                      |
| `slug`       | string  | No       | Auto     | URL slug. Auto-generated from `name` if omitted. Must be unique per tenant. (max 255) |
| `description`| string  | No       | `null`   | Category description (max 2000 chars)              |
| `icon_url`   | string  | No       | `null`   | URL to an icon/image representing the category (max 2048, must be valid URL) |
| `color`      | string  | No       | `null`   | Hex color code, e.g. `#4F46E5` (format: `#RRGGBB`) |
| `parent_id`  | UUID    | No       | `null`   | UUID of the parent category (`null` = top-level). Must reference an existing category. |
| `sort_order` | integer | No       | `0`      | Display order (min: 0, max: 32767)                 |
| `is_active`  | boolean | No       | `true`   | Whether the category is active                     |

### Example Request

```json
{
  "name": "Cloud Computing",
  "slug": "cloud-computing",
  "description": "Master AWS, Azure, GCP, and cloud-native technologies.",
  "icon_url": "https://cdn-icons-png.flaticon.com/512/3938/3938085.png",
  "color": "#3B82F6",
  "parent_id": null,
  "sort_order": 7,
  "is_active": true
}
```

### Response `201 Created`

```json
{
  "success": true,
  "message": "Course category created successfully",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440099",
    "name": "Cloud Computing",
    "slug": "cloud-computing",
    "description": "Master AWS, Azure, GCP, and cloud-native technologies.",
    "icon_url": "https://cdn-icons-png.flaticon.com/512/3938/3938085.png",
    "color": "#3B82F6",
    "sort_order": 7,
    "is_active": true,
    "created_at": "2026-06-23T12:00:00Z",
    "updated_at": "2026-06-23T12:00:00Z",
    "parent": null,
    "children": [],
    "courses_count": 0
  },
  "meta": {},
  "errors": [],
  "pagination": null
}
```

---

## 5. Update Category

> `PUT /api/v1/course-categories/{uuid}/update`

Update an existing course category. Only the provided fields are updated (partial update).

### Path Parameters

| Parameter | Type | Description           |
|-----------|------|-----------------------|
| `uuid`    | UUID | The category's UUID   |

### Request Body

| Field        | Type    | Required | Description                                        |
|--------------|---------|----------|----------------------------------------------------|
| `name`       | string  | No       | Category name (max 255)                            |
| `slug`       | string  | No       | URL slug. Auto-regenerated from `name` if omitted. Unique per tenant. |
| `description`| string  | No       | Category description (max 2000). Set `null` to clear. |
| `icon_url`   | string  | No       | URL to icon (max 2048, valid URL). Set `null` to clear. |
| `color`      | string  | No       | Hex color `#RRGGBB`. Set `null` to clear.          |
| `parent_id`  | UUID    | No       | UUID of parent. Set `null` to make top-level. Cannot be the category's own UUID. |
| `sort_order` | integer | No       | Display order (min: 0, max: 32767)                 |
| `is_active`  | boolean | No       | Active status                                      |

### Example Request

```json
{
  "name": "Cloud Computing (Advanced)",
  "sort_order": 5,
  "is_active": true
}
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Course category updated successfully",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440099",
    "name": "Cloud Computing (Advanced)",
    "slug": "cloud-computing-advanced",
    "description": "Master AWS, Azure, GCP, and cloud-native technologies.",
    "icon_url": "https://cdn-icons-png.flaticon.com/512/3938/3938085.png",
    "color": "#3B82F6",
    "sort_order": 5,
    "is_active": true,
    "created_at": "2026-06-23T12:00:00Z",
    "updated_at": "2026-06-23T12:30:00Z",
    "parent": null,
    "children": [],
    "courses_count": 0
  },
  "meta": {},
  "errors": [],
  "pagination": null
}
```

---

## 6. Toggle Active Status

> `PATCH /api/v1/course-categories/{uuid}/toggle-active`

Toggle a category's `is_active` status. If currently `true`, it becomes `false` and vice versa.

### Path Parameters

| Parameter | Type | Description           |
|-----------|------|-----------------------|
| `uuid`    | UUID | The category's UUID   |

### Request Body

None.

### Example Request

```
PATCH /api/v1/course-categories/550e8400-e29b-41d4-a716-446655440099/toggle-active
```

### Response `200 OK`

```json
{
  "success": true,
  "message": "Course category deactivated successfully",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440099",
    "name": "Cloud Computing (Advanced)",
    "slug": "cloud-computing-advanced",
    "description": "Master AWS, Azure, GCP, and cloud-native technologies.",
    "icon_url": "https://cdn-icons-png.flaticon.com/512/3938/3938085.png",
    "color": "#3B82F6",
    "sort_order": 5,
    "is_active": false,
    "created_at": "2026-06-23T12:00:00Z",
    "updated_at": "2026-06-23T13:00:00Z",
    "parent": null,
    "children": [],
    "courses_count": 0
  },
  "meta": {},
  "errors": [],
  "pagination": null
}
```

> The `message` field changes depending on the resulting state:
> - `"Course category activated successfully"` — when toggled to active
> - `"Course category deactivated successfully"` — when toggled to inactive

---

## 7. Delete Category

> `DELETE /api/v1/course-categories/{uuid}/delete`

Soft-delete a course category. The category is not permanently removed from the database. All child categories are **detached** (their `parent_id` is set to `null`).

### Path Parameters

| Parameter | Type | Description           |
|-----------|------|-----------------------|
| `uuid`    | UUID | The category's UUID   |

### Request Body

None.

### Example Request

```
DELETE /api/v1/course-categories/550e8400-e29b-41d4-a716-446655440099/delete
```

### Response `204 No Content`

```json
{
  "success": true,
  "message": "Course category deleted successfully",
  "data": null,
  "meta": {},
  "errors": [],
  "pagination": null
}
```

---

## Error Responses

### 401 Unauthenticated

Occurs when no valid Bearer token is provided.

```json
{
  "success": false,
  "message": "Unauthenticated",
  "data": null,
  "meta": {},
  "errors": [],
  "pagination": null
}
```

### 403 Forbidden

Occurs when the authenticated user does not have the required role (`super_admin` or `tenant`).

```json
{
  "success": false,
  "message": "This action is unauthorized.",
  "data": null,
  "meta": {},
  "errors": [],
  "pagination": null
}
```

### 404 Not Found

Occurs when the UUID does not match any existing (non-deleted) category.

```json
{
  "success": false,
  "message": "Course category not found",
  "data": null,
  "meta": {},
  "errors": ["Course category not found"],
  "pagination": null
}
```

### 422 Validation Error

Occurs when the request body fails validation.

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "meta": {},
  "errors": {
    "name": ["The name field is required."],
    "color": ["The color must be a valid hex color code (e.g., #FF5733)."],
    "slug": ["The slug has already been taken."]
  },
  "pagination": null
}
```

### 422 Unprocessable Entity (Business Logic)

Occurs on valid input but business rule violation.

```json
{
  "success": false,
  "message": "Parent category not found.",
  "data": null,
  "meta": {},
  "errors": ["Parent category not found."],
  "pagination": null
}
```

```json
{
  "success": false,
  "message": "A category cannot be its own parent.",
  "data": null,
  "meta": {},
  "errors": ["A category cannot be its own parent."],
  "pagination": null
}
```

---

## Request Summary Table

| Method   | Endpoint                              | Auth Required | Body   | Paginated | Description                       |
|----------|---------------------------------------|---------------|--------|-----------|-----------------------------------|
| `GET`    | `/api/v1/course-categories`           | Yes           | No     | Yes       | List categories with filters      |
| `GET`    | `/api/v1/course-categories/tree`      | Yes           | No     | No        | Get active categories as tree     |
| `GET`    | `/api/v1/course-categories/{uuid}`    | Yes           | No     | No        | Get single category by UUID       |
| `POST`   | `/api/v1/course-categories/store`     | Yes           | Yes    | No        | Create a new category             |
| `PUT`    | `/api/v1/course-categories/{uuid}/update` | Yes       | Yes    | No        | Update category by UUID           |
| `PATCH`  | `/api/v1/course-categories/{uuid}/toggle-active` | Yes | No  | No        | Toggle category active status     |
| `DELETE` | `/api/v1/course-categories/{uuid}/delete` | Yes      | No     | No        | Soft-delete category by UUID      |

---

## Data Model Reference

| Column        | Type                | Description                                    |
|---------------|---------------------|------------------------------------------------|
| `uuid`        | UUID (v4)           | Public identifier — used in all API endpoints  |
| `tenant_id`   | bigInteger (nullable)| Tenant scope (multi-tenancy)                   |
| `name`        | string              | Display name                                   |
| `slug`        | string              | URL-friendly identifier (unique per tenant)    |
| `description` | text (nullable)     | Long description                               |
| `icon_url`    | string (nullable)   | Icon/image URL                                 |
| `color`       | string(7) (nullable)| Hex color code `#RRGGBB`                       |
| `parent_id`   | bigInteger (nullable)| Self-referential FK — `null` = top-level      |
| `sort_order`  | unsignedSmallInteger| Display ordering (0–32767)                     |
| `is_active`   | boolean             | Visibility toggle (default: true)              |
| `created_by`  | bigInteger (nullable)| Creator user ID                               |
| `updated_by`  | bigInteger (nullable)| Last updater user ID                          |
| `created_at`  | timestamp           |                                              |
| `updated_at`  | timestamp           |                                              |
| `deleted_at`  | timestamp (nullable)| Soft delete timestamp                         |

> **Note:** `id`, `tenant_id`, `created_by`, `updated_by`, `deleted_by`, and `deleted_at` are hidden from API responses.
