# RSP Staffing — Recruitment Staffing Professional

Official corporate website for **RSP Staffing**, located at **30 N Gould St #32643, Sheridan, WY 82801, USA**.

## Features Included
- **Humanized Editorial Daylight UI/UX**: Built with a warm alabaster & sage palette (`#FAF8F5`, `#F1F6F4`), frosted daylight glassmorphism, and **Deep Petrol Teal (`#084C5E`)** + **Vibrant Growth Emerald (`#139A5E`)** derived directly from the official RSP logo.
- **Official Brand Assets**: High-resolution transparent RSP logo (`assets/images/rsp-logo.png`), original mark (`assets/images/rsp-logo-original.png`), and vector favicon (`assets/icons/favicon.svg`).
- **Direct WhatsApp Lead Routing (`+91 70089 05480`)**: All three forms (**Employer Hiring Requirement**, **Candidate Profile & Resume**, and **Contact Us**) validate inputs, store a backup record in `localStorage`, and automatically launch a formatted WhatsApp message to `917008905480`.
- **Official LinkedIn Integration**: Connected throughout the header, hero, why-choose-us, contact section, and footer (`https://www.linkedin.com/company/rsp-recruitment/home/?viewAsMember=true`).
- **SEO & LocalBusiness Schema**: Complete Open Graph metadata and verified `EmploymentAgency` JSON-LD structured data.

## Project Structure
```text
rsp-staffing/
├── index.html
├── about.html
├── services.html
├── industries.html
├── employers.html
├── candidates.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── rsp-logo.png
│   │   └── rsp-logo-original.png
│   └── icons/
│       └── favicon.svg
├── .gitignore
└── README.md
```

## Quick Git Push & GitHub Pages Deployment
```bash
git init
git add .
git commit -m "Initial launch: RSP Staffing humanized light-theme website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
Then in your GitHub repository, navigate to **Settings → Pages**, select **Deploy from a branch (`main` / `/root`)**, and click **Save**.
