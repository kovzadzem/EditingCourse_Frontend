# EditingCourse_Frontend
# EditingCourse_Frontend

# მონაცემთა ბაზის არქიტექტურის დაგეგმვა

## პროექტი:

**EditingCourse (Editorologia)**

---

# მონაცემთა ბაზის ტექნოლოგია

## DBMS:

### MongoDB

MongoDB არის NoSQL ტიპის დოკუმენტური მონაცემთა ბაზა.

გამოყენების მიზეზები:

* მოქნილი მონაცემთა სტრუქტურა;
* დიდი მოცულობის მონაცემების მარტივი მართვა;
* ვიდეო, მედია და კურსის სტრუქტურებისთვის მოსახერხებელი ფორმატი;
* სწრაფი მუშაობა დიდი რაოდენობის მონაცემებთან.

---

## Primary Key:

### UUID

გამოიყენება თითოეული ჩანაწერის უნიკალური იდენტიფიკაციისთვის.

მაგალითი:

```
550e8400-e29b-41d4-a716-446655440000
```

---

## ORM:

### Prisma ORM

Prisma გამოიყენება Backend-სა და MongoDB-ს შორის კომუნიკაციის სამართავად.

გამოყენება:

* Database Models-ის შექმნა;
* მონაცემებთან მუშაობა;
* Query-ების მართვა;
* მონაცემთა ვალიდაცია.

---

# მონაცემთა ბაზის მოდელები

---

# 1. Users Model

**დანიშნულება:**
მომხმარებლების (სტუდენტი/ადმინისტრატორი) შენახვა.

| ველი              | ტიპი                 |
| ----------------- | -------------------- |
| id                | UUID                 |
| first_name        | VARCHAR              |
| last_name         | VARCHAR              |
| email             | VARCHAR UNIQUE       |
| password_hash     | TEXT                 |
| phone             | VARCHAR              |
| role              | ENUM(admin, student) |
| avatar            | TEXT                 |
| email_verified_at | TIMESTAMP            |
| created_at        | TIMESTAMP            |
| updated_at        | TIMESTAMP            |

---

# 2. Social Accounts Model

**დანიშნულება:**
Google/Facebook ავტორიზაციის მონაცემების შენახვა.

| ველი             | ტიპი                   |
| ---------------- | ---------------------- |
| id               | UUID                   |
| user_id          | FK                     |
| provider         | ENUM(google, facebook) |
| provider_user_id | VARCHAR                |
| created_at       | TIMESTAMP              |

---

# 3. Courses Model

**დანიშნულება:**
სასწავლო კურსების ინფორმაციის შენახვა.

| ველი        | ტიპი                 |
| ----------- | -------------------- |
| id          | UUID                 |
| title       | VARCHAR              |
| description | TEXT                 |
| type        | ENUM(ondemand, live) |
| price       | DECIMAL              |
| thumbnail   | TEXT                 |
| promo_video | TEXT                 |
| is_active   | BOOLEAN              |

---

# 4. Course Sections Model

**დანიშნულება:**
კურსის ნაწილების/მოდულების მართვა.

| ველი       | ტიპი    |
| ---------- | ------- |
| id         | UUID    |
| course_id  | FK      |
| title      | VARCHAR |
| sort_order | INTEGER |

---

# 5. Lessons Model

**დანიშნულება:**
კურსის ლექციების შენახვა.

| ველი        | ტიპი             |
| ----------- | ---------------- |
| id          | UUID             |
| section_id  | FK               |
| title       | VARCHAR          |
| description | TEXT             |
| video_url   | TEXT             |
| duration    | INTEGER          |
| provider    | ENUM(vimeo, aws) |
| is_preview  | BOOLEAN          |
| sort_order  | INTEGER          |

---

# 6. Lesson Resources Model

**დანიშნულება:**
ლექციებთან დაკავშირებული ფაილების შენახვა.

| ველი      | ტიპი    |
| --------- | ------- |
| id        | UUID    |
| lesson_id | FK      |
| title     | VARCHAR |
| file_url  | TEXT    |

---

# 7. Syllabus Model

**დანიშნულება:**
კურსის პროგრამის/სილაბუსის მართვა.

| ველი        | ტიპი    |
| ----------- | ------- |
| id          | UUID    |
| course_id   | FK      |
| title       | VARCHAR |
| description | TEXT    |
| sort_order  | INTEGER |

---

# 8. Payments Model

**დანიშნულება:**
გადახდების ინფორმაციის შენახვა.

| ველი           | ტიპი                                     |
| -------------- | ---------------------------------------- |
| id             | UUID                                     |
| user_id        | FK                                       |
| gateway        | ENUM(TBC, BOG, PayPal)                   |
| amount         | DECIMAL                                  |
| transaction_id | VARCHAR                                  |
| status         | ENUM(pending, success, failed, refunded) |
| created_at     | TIMESTAMP                                |

---

# 9. Purchases Model

**დანიშნულება:**
მომხმარებლის მიერ შეძენილი კურსების მართვა.

| ველი          | ტიპი                            |
| ------------- | ------------------------------- |
| id            | UUID                            |
| user_id       | FK                              |
| course_id     | FK                              |
| payment_id    | FK                              |
| purchase_date | TIMESTAMP                       |
| expires_at    | TIMESTAMP                       |
| status        | ENUM(active, expired, refunded) |

---

# 10. Course Progress Model

**დანიშნულება:**
სტუდენტის ვიდეო პროგრესის შენახვა.

| ველი            | ტიპი    |
| --------------- | ------- |
| id              | UUID    |
| user_id         | FK      |
| lesson_id       | FK      |
| last_position   | INTEGER |
| watched_percent | DECIMAL |
| completed       | BOOLEAN |

---

# 11. Live Groups Model

**დანიშნულება:**
ლაივ კურსების ჯგუფების მართვა.

| ველი             | ტიპი                              |
| ---------------- | --------------------------------- |
| id               | UUID                              |
| course_id        | FK                                |
| title            | VARCHAR                           |
| max_students     | INTEGER                           |
| current_students | INTEGER                           |
| start_date       | DATE                              |
| schedule         | JSON                              |
| location         | TEXT                              |
| status           | ENUM(upcoming, active, completed) |

---

# 12. Live Group Members Model

**დანიშნულება:**
სტუდენტებისა და ლაივ ჯგუფების კავშირის შენახვა.

| ველი      | ტიპი      |
| --------- | --------- |
| id        | UUID      |
| group_id  | FK        |
| user_id   | FK        |
| joined_at | TIMESTAMP |

---

# 13. Lecture Recordings Model

**დანიშნულება:**
ლაივ ლექციების ჩანაწერების შენახვა.

| ველი        | ტიპი    |
| ----------- | ------- |
| id          | UUID    |
| group_id    | FK      |
| title       | VARCHAR |
| video_url   | TEXT    |
| lesson_date | DATE    |

---

# 14. Gallery Model

**დანიშნულება:**
ფოტო და ვიდეო მასალის მართვა.

| ველი       | ტიპი               |
| ---------- | ------------------ |
| id         | UUID               |
| title      | VARCHAR            |
| media_type | ENUM(photo, video) |
| file_url   | TEXT               |

---

# 15. Contact Messages Model

**დანიშნულება:**
მომხმარებლების შეტყობინებების შენახვა.

| ველი    | ტიპი                |
| ------- | ------------------- |
| id      | UUID                |
| name    | VARCHAR             |
| email   | VARCHAR             |
| phone   | VARCHAR             |
| message | TEXT                |
| status  | ENUM(new, answered) |

---

# 16. Settings Model

**დანიშნულება:**
საიტის ძირითადი პარამეტრების მართვა.

| ველი      | ტიპი    |
| --------- | ------- |
| id        | UUID    |
| site_name | VARCHAR |
| phone     | VARCHAR |
| email     | VARCHAR |
| address   | TEXT    |
| facebook  | VARCHAR |
| instagram | VARCHAR |
| youtube   | VARCHAR |

---

# მოდელებს შორის კავშირები

* Users → Payments (1:N)
* Users → Social Accounts (1:N)
* Courses → Course Sections (1:N)
* Course Sections → Lessons (1:N)
* Lessons → Lesson Resources (1:N)
* Courses → Syllabus (1:N)
* Courses → Live Groups (1:N)
* Live Groups → Lecture Recordings (1:N)
* Users ↔ Live Groups (N:M, Live Group Members Model-ის საშუალებით)
* Users ↔ Courses (N:M, Purchases Model-ის საშუალებით)

---

# Admin Panel (CMS) მოდულები

ადმინისტრატორის მართვის სისტემა მოიცავს:

* Dashboard
* Courses Management
* Sections & Lessons Management
* Live Groups Management
* Live Recordings Management
* Students Management
* Payments Management
* Gallery Management
* Syllabus Management
* Contact Messages
* Website Settings

---

# მონაცემთა ტიპების განმარტება

| ტიპი          | რას ინახავს              | მაგალითი                             |
| ------------- | ------------------------ | ------------------------------------ |
| VARCHAR(255)  | ტექსტი                   | "Giorgi", "Adobe Premiere"           |
| TEXT          | დიდი მოცულობის ტექსტი    | კურსის აღწერა                        |
| INTEGER       | მთელი რიცხვი             | 12, 100                              |
| DECIMAL(10,2) | ათწილადი რიცხვი          | 99.99                                |
| BOOLEAN       | კი/არა                   | true, false                          |
| DATE          | თარიღი                   | 2026-07-09                           |
| TIMESTAMP     | თარიღი და დრო            | 2026-07-09 15:30:00                  |
| UUID          | უნიკალური ID             | 550e8400-e29b-41d4-a716-446655440000 |
| JSON          | სტრუქტურირებული მონაცემი | {"day":"Monday","time":"19:00"}      |

---

## დასკვნა

მონაცემთა ბაზის არქიტექტურა დაგეგმილია ისე, რომ უზრუნველყოს ვიდეო სასწავლო პლატფორმის ყველა ძირითადი ფუნქციის მხარდაჭერა:

* მომხმარებლების მართვა;
* კურსების მართვა;
* ვიდეო კონტენტის შენახვა;
* გადახდების კონტროლი;
* სტუდენტის პროგრესის აღრიცხვა;
* ლაივ ჯგუფების მართვა;
* ადმინისტრატორის სრული კონტროლი.





# პროექტის არქიტექტურის დაგეგმვა და გამოყენებული ტექნოლოგიების კვლევა (Research)

---

# 1. პროექტის ტექნიკური არქიტექტურა

პროექტის არქიტექტურა დაიგეგმა მოდულარული მიდგომით, სადაც სისტემა იყოფა რამდენიმე ძირითად ნაწილად:

* Frontend (მომხმარებლის ინტერფეისი)
* Backend (ბიზნეს ლოგიკა და API)
* Database (მონაცემთა შენახვა)
* External Services (გარე სერვისების ინტეგრაციები)

სისტემის საერთო სტრუქტურა:

```
Frontend (Client)
        |
        |
        ↓
Backend API
        |
        |
        ↓
Database
        |
        |
        ↓
External Services
(Payment, Video Hosting, Authentication)
```

---

# 2. Frontend ტექნოლოგიები

## Framework:

### Next.js (React)

Frontend გამოყენებული იქნება:

* Landing Page-ისთვის;
* სტუდენტის Dashboard-ისთვის;
* Admin Panel-ისთვის.

---

# 3. Frontend Libraries

## Tailwind CSS

**დანიშნულება:**

გამოიყენება მომხმარებლის ინტერფეისის სტილის შესაქმნელად.

უპირატესობები:

* სწრაფი UI განვითარება;
* Responsive დიზაინის მხარდაჭერა;
* ერთიანი დიზაინის სისტემა.

---

## Shadcn/UI

**დანიშნულება:**

გამოიყენება მზა UI კომპონენტებისთვის:

* Buttons;
* Forms;
* Cards;
* Modals;
* Dashboard Components.

---

## React Hook Form + Zod

**დანიშნულება:**

ფორმების მართვა და ვალიდაცია.

გამოყენება:

* რეგისტრაცია;
* ავტორიზაცია;
* გადახდის ფორმები;
* Admin Panel-ის ფორმები.

---

## Zustand

**დანიშნულება:**

აპლიკაციის მდგომარეობის (State Management) მართვა.

გამოყენება:

* მომხმარებლის ავტორიზაციის მდგომარეობა;
* Dashboard მონაცემები;
* Global State.

---

# 4. Backend არქიტექტურა

## Framework:

### NestJS (Node.js)

**გამოყენების მიზეზები:**

* მოდულარული არქიტექტურა;
* დიდი პროექტებისთვის განკუთვნილი სტრუქტურა;
* მარტივი API ორგანიზება;
* უსაფრთხოების და Authentication სისტემების მხარდაჭერა.

---

## Backend მოდულები:

```
Authentication Module

Users Module

Courses Module

Lessons Module

Payments Module

Live Courses Module

Gallery Module

Admin Module
```

---

# 5. Database Architecture

## DBMS:

### MongoDB

MongoDB შეირჩა, როგორც მონაცემთა ბაზის მართვის სისტემა.

---

## ORM:

### Prisma ORM

Prisma გამოიყენება Backend-სა და Database-ს შორის კავშირის სამართავად.

გამოყენება:

* Database Models;
* Migration-ების მართვა;
* უსაფრთხო Query-ების შექმნა.

---

# 6. Authentication სისტემა

გამოყენებული ტექნოლოგიები:

## JWT (JSON Web Token)

გამოიყენება:

* მომხმარებლის ავტორიზაციისთვის;
* უსაფრთხო Session Management-ისთვის.

---

## OAuth

გამოიყენება სოციალური ავტორიზაციისთვის:

* Google Login;
* Facebook Login.

---

## Password Hashing

გამოყენებული იქნება:

* bcrypt

მიზანი:

მომხმარებლის პაროლების უსაფრთხოდ შენახვა.

---

# 7. Payment System Architecture

პლატფორმაზე ინტეგრირებული იქნება:

* TBC E-Commerce API
* BOG iPay API
* PayPal API

გადახდის პროცესი:

```
User
 ↓
Payment Gateway
 ↓
Backend Verification
 ↓
Payment Success
 ↓
Course Activation
```

წარმატებული გადახდის შემდეგ სისტემა ავტომატურად ანიჭებს მომხმარებელს კურსზე წვდომას.

---

# 8. Video Hosting Architecture

ვიდეოების პირდაპირ მონაცემთა ბაზაში შენახვა არ მოხდება.

გამოყენებული იქნება:

* Vimeo OTT
  ან
* AWS CloudFront + AWS S3

უპირატესობები:

* უსაფრთხო Streaming;
* ვიდეოების დაცვა არასანქცირებული ჩამოტვირთვისგან;
* მაღალი ხარისხის ვიდეო მიწოდება.

---

# 9. File Storage

გამოყენებული იქნება:

## AWS S3

გამოიყენება:

* გალერეის ფოტოებისთვის;
* სასწავლო მასალებისთვის;
* დამატებითი ფაილებისთვის.

---

# 10. Admin Panel Architecture

Admin Panel იქნება ცალკე მართვის სივრცე.

ძირითადი ფუნქციები:

* კურსების მართვა;
* ლექციების დამატება/რედაქტირება;
* სტუდენტების მართვა;
* გადახდების კონტროლი;
* Live ჯგუფების მართვა;
* ვიდეო ჩანაწერების ატვირთვა;
* გალერეის მართვა;
* საიტის ტექსტების ცვლილება.

---

# 11. Email Service

გამოყენებული იქნება:

* Resend / SendGrid

გამოყენება:

* რეგისტრაციის დადასტურება;
* პაროლის აღდგენა;
* გადახდის შეტყობინებები;
* სისტემური შეტყობინებები.

---

# 12. Deployment Architecture

## Frontend Hosting:

Vercel

## Backend Hosting:

AWS / Railway / Render

## Database Hosting:

PostgreSQL (Supabase / AWS RDS)

## File Storage:

AWS S3

---

# 13. უსაფრთხოების ზომები

სისტემაში გათვალისწინებული იქნება:

* HTTPS;
* JWT Authentication;
* Role Based Access Control (RBAC);
* Password Hashing;
* API Validation;
* მონაცემთა უსაფრთხო შენახვა.

მომხმარებლის როლები:

```
Admin

Student
```

---

# საბოლოო ტექნოლოგიური Stack

| კომპონენტი     | ტექნოლოგია                 |
| -------------- | -------------------------- |
| Frontend       | Next.js + React            |
| Styling        | Tailwind CSS               |
| UI Library     | Shadcn/UI                  |
| Backend        | NestJS                     |
| Database       | PostgreSQL                 |
| ORM            | Prisma                     |
| Authentication | JWT + OAuth                |
| Validation     | Zod                        |
| Forms          | React Hook Form            |
| Video Hosting  | Vimeo OTT / AWS CloudFront |
| Storage        | AWS S3                     |
| Payments       | TBC / BOG / PayPal         |
| Email          | Resend / SendGrid          |
| Deployment     | Vercel + AWS               |
