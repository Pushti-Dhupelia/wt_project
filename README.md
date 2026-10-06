# 🚀 Pushti Dhupelia - Developer Portfolio Website

A modern, clean, and responsive personal portfolio website created for **Pushti Dhupelia**, a B.Tech Computer Science student at Indus University and aspiring Software/Web Developer based in Ahmedabad, India.

---

## 🌟 Key Highlights & Design Features

- **Modern & Youthful Aesthetic**: Pure white cards, soft light background (`#f8fafc`), elegant typography (`Plus Jakarta Sans` & `JetBrains Mono`), and subtle indigo/purple accents.
- **Sticky Glassmorphism Navbar**: Responsive navigation with mobile hamburger toggle, smooth scrolling, active link indicator (ScrollSpy), and a quick **Resume** preview modal.
- **Hero Section**:
  - Live availability status indicator
  - Clean developer branding (`Pushti.dev`)
  - Profile image container with subtle floating developer elements: `<code />`, Flutter, Git v2.4, and `>_ devops`.
  - Core technology highlights: `Python • Java • C++ • Flutter • DevOps`
- **About Me**:
  - Structured academic profile highlighting Indus University (2024 – 2028).
  - Focus areas: Data Structures & Algorithms, Programming, Web Development, Software Development, Flutter Development, DevOps.
  - Four information cards: 🎓 Computer Science Student, 💻 Software Developer, 📱 Flutter Developer, 🚀 Technology Enthusiast.
- **Skills Section**:
  - Clean skill cards without exaggerated percentages.
  - Category filter tabs: All Skills, Programming, Development, Tools & Technologies.
  - Main skills featured:
    - **Python**: Core Programming, Problem Solving, Application Development
    - **Java**: Object-Oriented Programming, Application Development, Class Design
    - **C++**: Data Structures, Algorithms Analysis, Competitive Programming fundamentals
    - **Flutter**: Cross-platform application development, UI development, Flutter/Dart
    - **DevOps**: Development & deployment concepts, CI/CD fundamentals, Modern workflow
    - **Git**: Version control fundamentals, Branching & merge strategies, Repository management
    - **GitHub**: Cloud code hosting, Project collaboration & Pull Requests, Remote repository management
- **Projects Showcase**:
  - Visually attractive cards with custom SVG project illustrations and hover lift animations.
  - **Direct Live Application Launching**: Clicking **"View Project"** or clicking the project card preview opens the actual, fully functional live application directly (not GitHub):
    1. **[Student Registration Form](projects/student-registration/index.html)** (HTML, CSS, JavaScript) – Live student enrollment portal with real-time digital ID card synchronization and enrolled roster table.
    2. **[Calculator App](projects/calculator/index.html)** (HTML, CSS, JavaScript) – Interactive arithmetic calculator supporting keyboard input, expression parsing, and calculation history log.
    3. **[To-Do Application](projects/todo-app/index.html)** (HTML, CSS, JavaScript) – Task manager with priority tags, status filtering, task counters, and LocalStorage syncing.
  - Every project includes a `← Back to Portfolio` top navigation button to return effortlessly.
- **Let's Connect Section**:
  - Two-column layout with direct contact cards (Email, Location, GitHub, LinkedIn).
  - 1-click **"Copy Email"** button.
  - Interactive contact form with real-time client-side validation for **Full Name** (letters & spaces only, min 2 chars), **Email Address** (standard email format verification), and **Message**.
  - Dynamic visual validation states (`.is-valid`, `.is-invalid`), status icons, and helpful error tips.
- **Resume Modal & Back-to-Top**:
  - Resume Modal with instant print/save PDF capability
  - Smooth floating back-to-top button

---

## 📁 Project Structure

```
wt_project/
├── index.html                   # Semantic HTML5 single-page structure
├── style.css                    # Design system (root mirror)
├── script.js                   # Client interactivity & validation (root mirror)
├── css/
│   └── style.css                # Custom CSS design system, typography & animations
├── js/
│   └── script.js                # Vanilla JavaScript for navbar, filters, modals, validation
├── assets/
│   └── images/                  # Profile avatar and SVG illustrations
│       ├── pushti_avatar.jpg    # Developer profile photo
│       ├── favicon.svg          # Branded favicon (<PD/>)
│       ├── project-college-mgmt.svg
│       ├── project-calculator.svg
│       ├── project-student-reg.svg
│       ├── project-todo.svg
│       ├── project-python-app.svg
│       └── project-devops.svg
└── README.md                    # Project documentation
```

---

## 🌐 How to Run Locally

You can open the website directly in any web browser or run a lightweight local HTTP server:

### Option 1: Direct File Open
Double-click `index.html` or open it with Google Chrome / Microsoft Edge / Firefox.

### Option 2: Using Python Simple HTTP Server
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Deploying to GitHub Pages

1. Initialize git and commit the files (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit of modern developer portfolio"
   ```
2. Link to your GitHub repository:
   ```bash
   git remote add origin https://github.com/Pushti-Dhupelia/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - On GitHub, go to your repository **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. Your website will be live in a couple of minutes at:
   `https://pushti-dhupelia.github.io/portfolio/`
