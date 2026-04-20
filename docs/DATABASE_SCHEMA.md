# 🗄️ Database Architecture & Schema Map

The Alumni Management Portal is fundamentally driven by PostgreSQL relational mappings configured via Django's integrated Object Relational Mapper (ORM).

There are **three primary domains** of the Database.

## 1. Authentication & Profiling Domain
Located fundamentally under the `Django User` subclass constraint.
- `User`: Standard auth table extended with Role metrics (`admin`, `alumni`, `coordinator`, `mentor`). Stripped of `username` mappings utilizing `email` primarily.
- `AlumniProfile / MentorProfile`: 1-to-1 foreign mappings to isolate specialized payload limits and array constructs (for `skills`, `languages`).
- `UserSocialLink / UserExperience`: 1-to-Many foreign key mappings defining timeline events and external references.
- **Notable Architecture**: Mentors possess independent capability definitions (i.e., `max_mentees`), fundamentally isolating computation from the standard `Alumni` payload.

## 2. Interactive Networking Domain
Provides real-time activity tracking logic directly mapping the `chat.html` frontend features.
- `MentorshipRequest`: Tracks the approval pipeline. Implements unique constraint tuples between the Mentee and the target Mentor to avoid duplicate networking conflicts.
- `Post / PostComment / PostLike`: Traditional cascade-based feed topology. Enables 1-to-Many deletion scaling natively.
- `Message (Chat Subsystem)`: Isolated node-to-node connectivity mapping storing literal payload text. Our schema inherently supports the `unread` boolean state and group-categorization that the frontend utilizes in its sidebar tabs (`All, Groups, Unread`). Notification structures replicate similar mappings externally.

## 3. Structural Web Domain
Existed historically inside NoSQL JavaScript structures but now dynamically configurable via DB Tables.
- `Job` and `Event`: Aggregate collections linked respectively to user accounts (Creators).
- `JobApplication` and `EventAttendee`: Represent interactive relationships and registration behaviors dynamically over time.
- `WhyJoin` and `Testimonial`: Component-driven relational logic entirely designed to serve scalable static arrays for the Landing Page rendering block (`HomepageAPIView`).

## Migration Philosophy
Migrations are created intrinsically mapped to Django `makemigrations`. To verify the exact SQL schema Django provisions to Postgres, run:
```bash
python manage.py sqlmigrate api 0001
```
*(This command will output the RAW SQL schema equivalents)*
