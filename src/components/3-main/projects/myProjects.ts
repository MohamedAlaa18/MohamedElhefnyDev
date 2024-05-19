export const myProjects = [
  {
    projectTitle: "EduNex 📚",
    imagPath: "./images/8.png",
    projectDescription:
      "An interactive learning platform developed with Angular and Angular Material. Seamlessly explore diverse courses, engage with interactive resources, and track your progress with real-time analytics. Angular ensures a smooth and responsive user interface, while Angular Material provides a visually appealing design for an optimal learning experience.",
    category: ["angular", "angularMaterial", "jwt", "typeScript", ".net"],
    source: "https://github.com/MohamedAlaa18/EduNexFront",
    demo: "https://edu-nex-front.vercel.app/",
  },
  {
    projectTitle: "Little Lemon 🍋",
    imagPath: "./images/1.png",
    projectDescription:
      "Little Lemon, a delightful restaurant site crafted with React, Redux, and Sass. Elevate your dining experience with smooth table bookings and seamless navigation. React powers our intuitive user interface, while Redux manages state effortlessly. Get ready for a zestful journey through flavors and convenience.",
    category: ["react", "redux", "sass"],
    source: "https://github.com/MohamedAlaa28/lemon-restaurant-app",
    demo: "https://mohamedalaa28.github.io/restaurant-web-app",
  },
  {
    projectTitle: "Mercado 🛒",
    imagPath: "./images/4_2.png",
    projectDescription:
      "Discover Mercado, the ultimate e-commerce app, meticulously crafted with Next.js and Material UI. Emphasizing user satisfaction, it ensures smooth navigation and hassle-free purchases. Next.js drives efficiency, while Material UI provides aesthetic design elements. Prepare for a delightful shopping spree at Mercado!",
    category: ["next", "typeScript", "redux", "mui"],
    source: "https://github.com/MohamedAlaa28/e-commece-web-app",
    demo: "https://e-commece-web-app.vercel.app/",
  },
  {
    projectTitle: "Dashboard 📊",
    imagPath: "./images/5.png",
    projectDescription:
      "Admin Dashboard is a comprehensive web application designed to provide administrators with intuitive tools and insights for managing and analyzing data efficiently. Built with modern technologies such as React.js, Next.js, and Material-UI, this dashboard offers a seamless user experience with features including dynamic data visualization.",
    category: ["next", "typeScript", "mui"],
    source: "https://github.com/MohamedAlaa28/admin-dashboard",
    demo: "https://admin-dashboard-omega-indol.vercel.app/",
  },
  {
    projectTitle: "Vendo 💼",
    imagPath: "./images/3.png",
    projectDescription:
      "Vendo is a dynamic and user-friendly web application built using cutting-edge technologies such as React, Tailwind CSS. This dashboard serves as a centralized hub for vendors, providing them with the tools and features needed to manage their products, orders, and overall e-commerce operations efficiently.",
    category: ["react", "tailwind"],
    source: "https://github.com/MohamedAlaa28/Vendor-Dashboard",
    demo: "https://mohamedalaa28.github.io/vendor-dashboard/",
  },
  {
    projectTitle: "MyReads 📚",
    imagPath: "./images/6.png",
    projectDescription:
      "Introducing MyReads, a user-friendly web app developed with React.js that lets you effortlessly organize your reading list. Easily categorize books you've read, are currently reading, or plan to read in the future. With intuitive features and a clean interface, managing your reading habits has never been easier. Dive into the world of books with MyReads!",
    category: ["react", "css"],
    source: "https://github.com/MohamedAlaa28/book-tracking-app",
    demo: "https://mohamedalaa28.github.io/book-tracking-app/",
  },
  {
    projectTitle: "BookStacker 📚",
    imagPath: "./images/7.png",
    projectDescription:
      "BookStacker is your ultimate companion for managing your personal library collections. This web-based application offers an intuitive interface equipped with tools for organizing, searching, editing, and deleting book entries effortlessly. Streamline your book management experience with BookStacker and keep your library in perfect order.",
    category: ["html", "javaScript", "css", "bootstrap"],
    source: "https://github.com/MohamedAlaa28/simple-library-system",
    demo: "https://mohamedalaa28.github.io/simple-library-system/",
  }
];

export interface ProjectType {
  imagPath: string;
  projectTitle: string;
  projectDescription: string;
  category: string[];
  demo: string;
  source: string;
}
