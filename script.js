// /counter 
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-number');

  const options = {
    threshold: 0.5 // Trigger animation when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const plusSign = counter.nextElementSibling.textContent.includes('+') ? '+' : '';
        const step = target / 200; // Adjust for faster or slower counting

        let count = 0;
        const updateCount = () => {
          if (count < target) {
            count += step;
            counter.innerText = Math.ceil(count) + plusSign;
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target + plusSign;
          }
        };
        updateCount();
        observer.unobserve(counter); // Stop observing after animation
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});


// gsap
function page1Animation() {
  let tl = gsap.timeline();

  // Header/Navigation animation
  tl.from(".contracted, .manage", {
    y: -30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
  });

  // Main content (page 1) animation
  tl.from(
    ".title",
    {
      y: 50,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.3"
  );

  tl.from(".graph, .button", {
    opacity: 0,
    duration: 0.5,
  }, "-=0.2");

  // Bottom elements (rectangles and circles) animation
  tl.from(".section-collection > div, .right", {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
  }, "-=0.3");
}

function page2Animation(){
    let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section2",
          scroller: "body",
          start: "top 70%",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      tl2.from(".services", {
        y: 30,
        opacity:0,
        duration:0.5
      });

      // Animation for all 6 elements in pairs
      tl2.from(".elem.line1.elem-left", {
          x:-300,
          opacity: 0,
          duration: 1,
      }, "line-start");

      tl2.from(".elem.line1.elem-right", {
          x:300,
          opacity: 0,
          duration: 1,
      }, "line-start");

      tl2.from(".elem.line2.elem-left", {
          x:-300,
          opacity: 0,
          duration: 1,
      }, "line-start+=0.5");

      tl2.from(".elem.line2.elem-right", {
          x:300,
          opacity: 0,
          duration: 1,
      }, "line-start+=0.5");

      tl2.from(".elem.line3.elem-left", {
          x:-300,
          opacity: 0,
          duration: 1,
      }, "line-start+=1");

      tl2.from(".elem.line3.elem-right", {
          x:300,
          opacity: 0,
          duration: 1,
      }, "line-start+=1");
}













// cards animation - COMPLETELY UPDATED VERSION
const cards = document.querySelectorAll(".card-element");
const textSections = document.querySelectorAll(".text-area");
const total = cards.length;

// ADDED: Initially show first text section, hide others
textSections.forEach((section, index) => {
  if (index === 0) {
    section.classList.remove('inactive');
  } else {
    section.classList.add('inactive');
  }
});

window.addEventListener("scroll", () => {
  const main = document.querySelector(".sticky-card-stack-container");
  if (!main) return;

  // Get container position relative to viewport
  const rect = main.getBoundingClientRect();
  const containerTop = rect.top;
  const containerHeight = rect.height;
  const windowHeight = window.innerHeight;
  
  // Only animate when container is in view
  if (containerTop > windowHeight || containerTop + containerHeight < 0) {
    return;
  }

  // Calculate progress based on how much of container has scrolled past
  let progress = 0;
  if (containerTop <= 0) {
    progress = Math.min(Math.abs(containerTop) / (containerHeight - windowHeight), 1);
  }

  // Animate cards
  cards.forEach((card, i) => {
    const scale = Math.max(0.8, 1 - (total - i - 1) * 0.05 + progress * 0.3);
    const translateY = i * 30 - progress * i * 20;
    card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    
    // Set z-index to ensure proper stacking
    card.style.zIndex = total - i;
  });

  // FIXED: Better calculation for active section with proper last card handling
  const sectionProgress = progress * total;
  let activeSection;
  
  if (progress >= 0.95) {
    // Near the end, show the last section
    activeSection = total - 1;
  } else {
    activeSection = Math.min(Math.floor(sectionProgress), total - 1);
  }
  
  // FIXED: Show/hide text sections with proper class management
  textSections.forEach((textSection, i) => {
    if (i === activeSection) {
      textSection.classList.remove('inactive');
    } else {
      textSection.classList.add('inactive');
    }
  });

  // Debug logging - remove after testing
  // console.log('Progress:', progress.toFixed(2), 'Active Section:', activeSection, 'Total:', total);
});









// Run animations
page1Animation();
page2Animation();





// portfolio filter
function filterProjects(category) {
  const cards = document.querySelectorAll('.portfolio-card');
  const tabs = document.querySelectorAll('.filter-tab');
  
  // Update active tab
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter cards
  cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.8s ease';
      } else {
          card.style.display = 'none';
      }
  });
}


// Add hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.portfolio-card');
  
  cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) rotateX(5deg)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) rotateX(0deg)';
      });
  });
});

// Loading animation logic
document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const mainContent = document.getElementById('mainContent');
  const progressBars = document.querySelectorAll('.progress-fill');

  // Check if elements exist before using them
  if (loadingOverlay) {
    // Simulate loading time
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        
        // Animate progress bars after loading
        setTimeout(() => {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                  bar.style.width = width;
                }
            });
        }, 500);
    }, 3000);
  }

  // Tab switching functionality with progress bar animation
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Reset progress bars to 0 first
          progressBars.forEach(bar => {
              bar.style.width = '0%';
              bar.style.transition = 'none';
          });
          
          // Animate progress bars after tab switch
          setTimeout(() => {
              progressBars.forEach(bar => {
                  bar.style.transition = 'width 2s ease';
                  const width = bar.getAttribute('data-width');
                  if (width) {
                    bar.style.width = width;
                  }
              });
          }, 100);
          
          // Update content based on selected tab
          updateTabContent(this.getAttribute('data-tab'));
      });
  });

  // Function to update tab content
  function updateTabContent(tabName) {
      const caseHeader = document.querySelector('.case-header');
      const sections = document.querySelectorAll('.section p');
      
      if (!caseHeader) return;
      
      // Tab-specific content
      const tabData = {
          'aiims': {
              logo: 'https://brandingpioneers.com/assets/aiims.webp',
              title: 'AIIMS Geriatrics',
              subtitle: 'Healthcare • Video Marketing • Social Media Strategy',
              challenge: 'AIIMS Geriatrics faced challenges in expanding its digital presence and educating the public about geriatric health issues. They needed to enhance patient engagement, particularly with elderly patients and their caregivers.',
              solution: 'We developed a comprehensive video marketing strategy, producing tailored content to engage the older demographic. By utilizing targeted social media, we boosted patient education and outreach.',
              impact: 'Our strategic efforts resulted in a 400% increase in video engagement and a 2x growth in social media following. These outcomes helped drive patient consultations and raise awareness.'
          },
          'apollo': {
              logo: 'logo.webp',
              title: 'Apollo Indraprastha',
              subtitle: 'Healthcare • Digital Transformation • Patient Experience',
              challenge: 'Apollo Indraprastha needed to modernize their patient experience and streamline digital appointments. Legacy systems were causing delays and patient dissatisfaction.',
              solution: 'We implemented a comprehensive digital transformation strategy with AI-powered chatbots, online appointment system, and personalized patient portals for better healthcare delivery.',
              impact: 'Achieved 250% increase in online appointments, reduced waiting times by 60%, and improved patient satisfaction scores by 85% through our digital solutions.'
          },
          'astro': {
              logo: 'astrovazar.webp',
              title: 'Astro Bazar',
              subtitle: 'E-commerce • Mobile App • User Experience',
              challenge: 'Astro Bazar struggled with low mobile conversion rates and poor user experience. Their existing platform was not optimized for mobile commerce.',
              solution: 'We redesigned their mobile app with intuitive navigation, implemented AI-driven product recommendations, and optimized the checkout process for better conversions.',
              impact: 'Mobile conversions increased by 180%, app ratings improved to 4.8 stars, and monthly active users grew by 320% within six months of launch.'
          },
          'dst': {
              logo: 'dst.webp',
              title: 'DST Solutions',
              subtitle: 'Technology • Data Analytics • Business Intelligence',
              challenge: 'DST needed to modernize their data analytics capabilities and provide real-time business intelligence to their clients across multiple industries.',
              solution: 'We built a comprehensive data analytics platform with real-time dashboards, predictive analytics, and automated reporting systems for better business insights.',
              impact: 'Data processing speed improved by 500%, client satisfaction increased by 75%, and helped clients make 3x faster business decisions with our analytics platform.'
          }
      };
      
      const data = tabData[tabName];
      if (data) {
          // Update logo and title
          caseHeader.innerHTML = `
              <div class="logo">
                  <img src="${data.logo}" alt="${data.title} Logo">
              </div>
              <div class="case-info">
                  <h3>${data.title}</h3>
                  <p>${data.subtitle}</p>
              </div>
          `;
          
          // Update sections with unique animation classes
          const challengeSolution = document.querySelector('.challenge-solution');
          if (challengeSolution) {
            challengeSolution.innerHTML = `
                <div class="section challenge challenge-box-animate">
                    <h4>The Challenge</h4>
                    <p>${data.challenge}</p>
                </div>
                <div class="section solution solution-box-animate">
                    <h4>The Solution</h4>
                    <p>${data.solution}</p>
                </div>
                <div class="section impact impact-box-animate">
                    <h4>The Impact</h4>
                    <p>${data.impact}</p>
                </div>
            `;
          }
      }
  }

  // CTA button interaction
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 150);
        
        console.log('View Full Case Study clicked');
    });
  }

  // Add hover effects to metrics
  const metrics = document.querySelectorAll('.metric');
  metrics.forEach(metric => {
      metric.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
          this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      });
      
      metric.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = 'none';
      });
  });
});


// Add shimmer CSS for progress bar
const style = document.createElement('style');
style.textContent = `
    .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 20px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));
        animation: shimmer 2s infinite;
        opacity: 0;
    }
    
    .progress-fill.animating::after {
        opacity: 1;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);





function reloadWithLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const progressBars = document.querySelectorAll('.progress-fill');
  
  if (!loadingOverlay) return;
  
  // Reset progress bars
  progressBars.forEach(bar => {
      bar.style.width = '0%';
  });
  
  // Show loading overlay
  loadingOverlay.classList.remove('hidden');
  
  // Simulate loading again
  setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      setTimeout(() => {
          progressBars.forEach(bar => {
              const width = bar.getAttribute('data-width');
              if (width) {
                bar.style.width = width;
              }
          });
      }, 500);
  }, 3000);
}

// Keyboard shortcut for reload
document.addEventListener('keydown', function(e) {
  if (e.key === 'l' || e.key === 'L') {
      reloadWithLoading();
  }
});

// ADDED: Test function to verify card stack is working
function testCardStack() {
  const cards = document.querySelectorAll('.card-element');
  const textAreas = document.querySelectorAll('.text-area');
  
  console.log('Card Stack Test:');
  console.log('Total cards found:', cards.length);
  console.log('Total text areas found:', textAreas.length);
  
  textAreas.forEach((area, index) => {
    const isActive = !area.classList.contains('inactive');
    console.log(`Text area ${index}:`, isActive ? 'VISIBLE' : 'HIDDEN');
  });
}

// Run test after page loads - remove after confirming it works
setTimeout(testCardStack, 1000);