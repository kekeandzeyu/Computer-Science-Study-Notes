document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        ".introduction, .intention-background, .contribution",
    );
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.5,
        },
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});