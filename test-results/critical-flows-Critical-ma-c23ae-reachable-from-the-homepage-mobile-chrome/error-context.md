# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: critical-flows.spec.ts >> Critical marketing flows >> locations section is reachable from the homepage
- Location: e2e/critical-flows.spec.ts:48:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('navigation', { name: /primary/i }).getByRole('link', { name: /^locations$/i })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to main content" [ref=e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - generic [ref=e10]:
      - link "United Black Belt Academy home" [ref=e11] [cursor=pointer]:
        - /url: /
        - generic [ref=e12]:
          - generic [ref=e13]: United Black Belt
          - generic [ref=e14]: Academy
      - button "Open menu" [ref=e16] [cursor=pointer]
  - main [ref=e20]:
    - region "United Black Belt Academy" [ref=e21]:
      - img [ref=e22]
      - button "Play background video" [ref=e23] [cursor=pointer]
      - generic [ref=e24]: Decorative background video; audio is muted. Playback is optional.
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]: 📍
          - text: Allendale & Midland Park, NJ
        - heading "United Black Belt Academy" [level=1] [ref=e29]
        - paragraph [ref=e30]: Confidence Building Martial Arts Classes in Allendale & Midland Park
        - paragraph [ref=e31]: Taekwondo and martial arts for kids, teens, and adults — building confidence, discipline, focus, fitness, and practical self-defense at our Bergen County schools.
        - generic [ref=e32]:
          - link "Try A Class For Free!" [ref=e33] [cursor=pointer]:
            - /url: /contact
            - text: Try A Class For Free!
            - generic [ref=e34]: →
          - link "Children's Programs" [ref=e35] [cursor=pointer]:
            - /url: /programs/children
          - link "Adult Programs" [ref=e36] [cursor=pointer]:
            - /url: /programs/adult
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: ★★★★★
            - text: Loved by local families
          - generic [ref=e40]:
            - generic [ref=e41]: ●
            - text: Ages 3 through adult
          - generic [ref=e42]:
            - generic [ref=e43]: ●
            - text: 3 convenient locations
      - generic [ref=e44]:
        - generic [ref=e45]: Scroll
        - generic [ref=e46]: ↓
    - generic [ref=e48]:
      - generic [ref=e49]: Confidence ◆
      - generic [ref=e50]: Discipline ◆
      - generic [ref=e51]: Focus ◆
      - generic [ref=e52]: Respect ◆
      - generic [ref=e53]: Fitness ◆
      - generic [ref=e54]: Self-Defense ◆
      - generic [ref=e55]: Personal Development ◆
      - generic [ref=e56]: Confidence ◆
      - generic [ref=e57]: Discipline ◆
      - generic [ref=e58]: Focus ◆
      - generic [ref=e59]: Respect ◆
      - generic [ref=e60]: Fitness ◆
      - generic [ref=e61]: Self-Defense ◆
      - generic [ref=e62]: Personal Development ◆
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]: Find Your Path
        - heading "Programs for every age & stage" [level=2] [ref=e67]
        - paragraph [ref=e68]: From Tiny Tigers to adult martial arts, choose an age-specific path — then try a free class in Allendale or Midland Park.
      - generic [ref=e69]:
        - article [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e73]: 🐯
            - generic [ref=e74]:
              - generic [ref=e75]: Ages 3-5
              - heading "Tiny Tigers" [level=3] [ref=e76]
              - paragraph [ref=e77]: A playful first step into martial arts that builds focus, listening skills, and confidence through age-appropriate games and drills.
              - link "Learn How It Works →" [ref=e78] [cursor=pointer]:
                - /url: /programs/tiny-tigers
                - text: Learn How It Works
                - generic [ref=e79]: →
        - article [ref=e80]:
          - generic [ref=e81]:
            - generic [ref=e83]: 🥋
            - generic [ref=e84]:
              - generic [ref=e85]: Ages 6-10
              - heading "Junior Tigers" [level=3] [ref=e86]
              - paragraph [ref=e87]: Structured classes where kids sharpen coordination, discipline, and self-control while making new friends and earning belts.
              - link "Learn How It Works →" [ref=e88] [cursor=pointer]:
                - /url: /programs/junior-tigers
                - text: Learn How It Works
                - generic [ref=e89]: →
        - article [ref=e90]:
          - generic [ref=e91]:
            - generic [ref=e93]: ⚡
            - generic [ref=e94]:
              - generic [ref=e95]: Ages 11-17
              - heading "Teen Martial Arts" [level=3] [ref=e96]
              - paragraph [ref=e97]: A positive outlet that channels energy into fitness, resilience, and leadership as teens build real self-defense skills.
              - link "Learn How It Works →" [ref=e98] [cursor=pointer]:
                - /url: /programs/teen-martial-arts
                - text: Learn How It Works
                - generic [ref=e99]: →
        - article [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e103]: 💪
            - generic [ref=e104]:
              - generic [ref=e105]: Ages 18+
              - heading "Adult Martial Arts" [level=3] [ref=e106]
              - paragraph [ref=e107]: Get in the best shape of your life while learning practical self-defense in a welcoming, no-ego training environment.
              - link "Learn How It Works →" [ref=e108] [cursor=pointer]:
                - /url: /programs/adult-program
                - text: Learn How It Works
                - generic [ref=e109]: →
    - generic [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]: Why It Matters
        - heading "We help parents raise confident leaders & adults reach their full potential" [level=2] [ref=e114]
        - paragraph [ref=e115]: Martial arts is about far more than kicks and punches. Every class is built to strengthen the skills that carry into school, work, and life.
        - generic [ref=e116]:
          - generic [ref=e117]: Confidence
          - generic [ref=e118]: Discipline
          - generic [ref=e119]: Focus
          - generic [ref=e120]: Respect
          - generic [ref=e121]: Fitness
          - generic [ref=e122]: Self-Defense
          - generic [ref=e123]: Personal Development
        - link "Try A Class For Free! →" [ref=e124] [cursor=pointer]:
          - /url: /contact
          - text: Try A Class For Free!
          - generic [ref=e125]: →
      - generic [ref=e127]:
        - generic:
          - img
        - img "Instructor coaching a young student" [ref=e128]:
          - generic [ref=e129]: 🏆
          - generic [ref=e130]: PLACEHOLDER · Instructor coaching a young student
    - generic [ref=e133]:
      - generic [ref=e135]:
        - generic [ref=e136]: "0"
        - generic [ref=e137]: NJ Locations
      - generic [ref=e139]:
        - generic [ref=e141]: 0+
        - generic [ref=e142]: Students Trained
        - generic [ref=e143]: Pending confirmation
      - generic [ref=e145]:
        - generic [ref=e147]: 0+
        - generic [ref=e148]: Years Serving Bergen County
        - generic [ref=e149]: Pending confirmation
      - generic [ref=e151]:
        - generic [ref=e153]: 0★
        - generic [ref=e154]: Average Parent Rating
        - generic [ref=e155]: Pending confirmation
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]: Get Started
        - heading "Crush your fitness goals while learning how to protect yourself" [level=2] [ref=e160]
        - paragraph [ref=e161]: Tell us a little about your goals and preferred school. We'll help you choose a program and schedule a free introductory class — no pressure, just a welcoming first step onto the mat.
        - list [ref=e162]:
          - listitem [ref=e163]: ✓ Kids, teens, and adult programs
          - listitem [ref=e164]: ✓ Allendale & Midland Park locations
          - listitem [ref=e165]: ✓ Beginners welcome — no experience required
      - generic [ref=e167]:
        - generic [ref=e169]: Free Class Request
        - paragraph [ref=e170]: Fields marked with an asterisk (*) are required. We'll use your contact details only to schedule your free class.
        - generic [ref=e175]:
          - generic [ref=e176]: Website
          - textbox [ref=e177]
          - generic [ref=e178]:
            - generic [ref=e179]: Full Name *
            - textbox "Full Name" [ref=e180]:
              - /placeholder: Your name
          - generic [ref=e181]:
            - generic [ref=e182]: Email *
            - textbox "Email" [ref=e183]:
              - /placeholder: you@example.com
          - generic [ref=e184]:
            - generic [ref=e185]: Phone *
            - textbox "Phone" [ref=e186]:
              - /placeholder: (201) 555-0123
          - generic [ref=e187]:
            - generic [ref=e188]: Location
            - combobox "Location" [ref=e189]:
              - option "Choose a location" [disabled] [selected]
              - option "Allendale"
              - option "Midland Park"
              - option "Glen Rock"
          - generic [ref=e190]:
            - generic [ref=e191]: Program
            - combobox "Program" [ref=e192]:
              - option "Choose a program" [disabled] [selected]
              - option "Tiny Tigers (Ages 3-5)"
              - option "Junior Tigers (Ages 6-10)"
              - option "Teen Martial Arts"
              - option "Adult Martial Arts"
              - option "Family Programs"
              - option "Birthday Parties"
              - option "Summer / Day Camp"
              - option "Parents' Night Out"
              - option "Not sure yet"
          - generic [ref=e193]:
            - generic [ref=e194]: Message
            - textbox "Message" [ref=e195]:
              - /placeholder: Tell us a bit about what you're looking for...
          - generic [ref=e196]:
            - button "Try A Class For Free!" [ref=e197] [cursor=pointer]:
              - text: Try A Class For Free!
              - generic [ref=e198]: →
            - paragraph [ref=e199]: No experience required · Beginners welcome · No obligation — we'll contact you to schedule your first class.
    - generic [ref=e201]:
      - img "Sanghyun Lee, Head Instructor" [ref=e204]:
        - generic [ref=e205]: 🥋
        - generic [ref=e206]: PLACEHOLDER · Sanghyun Lee, Head Instructor
      - generic [ref=e207]:
        - generic [ref=e208]: Meet The Owner
        - heading "Hi, my name is Sanghyun Lee" [level=2] [ref=e209]
        - paragraph [ref=e210]: Martial arts changed the course of my life, and I have spent my career sharing that same growth with our community.
        - blockquote [ref=e211]: "\"Confidence is a skill. We teach it one class at a time.\""
        - generic [ref=e212]:
          - paragraph [ref=e213]: I opened United Black Belt Academy to build more than a training floor — I wanted a place where kids find their voice, teens discover their strength, and adults rediscover what their bodies can do.
          - paragraph [ref=e214]: Every class is designed to be challenging, welcoming, and genuinely fun. Progress is personal here. We celebrate the quiet wins as loudly as the black belts.
          - paragraph [ref=e215]: When you step onto our mat, you are not a membership number. You are part of a family that shows up for one another, on the good days and the hard ones.
        - paragraph [ref=e216]: — Sanghyun Lee
        - list [ref=e217]:
          - listitem [ref=e218]: ✓ Rank & certifications — pending owner confirmation
          - listitem [ref=e219]: ✓ Years of experience — pending owner confirmation
        - link "Try A Class For Free! →" [ref=e220] [cursor=pointer]:
          - /url: /contact
          - text: Try A Class For Free!
          - generic [ref=e221]: →
    - generic [ref=e223]:
      - generic [ref=e224]:
        - generic [ref=e225]: Getting Started
        - heading "Your journey, belt by belt" [level=2] [ref=e226]
        - paragraph [ref=e227]: Starting is simple. Here's the path from your first free class to lifelong growth.
      - generic [ref=e228]:
        - generic [ref=e230]:
          - generic [ref=e232]: Step 1 · White Belt
          - heading "Redeem A Web Offer" [level=3] [ref=e233]
          - paragraph [ref=e234]: Claim one of our exclusive online offers to lock in your free introductory class — no obligation.
        - generic [ref=e236]:
          - generic [ref=e238]: Step 2 · Blue Belt
          - heading "Schedule Your First Lesson" [level=3] [ref=e239]
          - paragraph [ref=e240]: We reach out to book a semi-private first lesson at a time that fits your family.
        - generic [ref=e242]:
          - generic [ref=e244]: Step 3 · Red Belt
          - heading "Begin The Journey" [level=3] [ref=e245]
          - paragraph [ref=e246]: Step onto the mat and start building confidence, discipline, and lifelong skills.
        - generic [ref=e248]:
          - generic [ref=e250]: Step 4 · Black Belt
          - heading "Grow For Life" [level=3] [ref=e251]
          - paragraph [ref=e252]: Progress through the ranks with a team that believes in you every step of the way.
    - generic [ref=e254]:
      - generic [ref=e255]:
        - generic [ref=e256]: You Belong Here
        - heading "Martial arts for every age & ability" [level=2] [ref=e257]
        - paragraph [ref=e258]: Whether you want an exciting activity for your child or a motivating alternative to the gym, there's a place for you on our mat. No experience required — just show up ready to grow.
      - generic [ref=e259]:
        - article [ref=e260]:
          - link "Children's Classes Confidence, listening, discipline, respect, and friendships — the foundation for confident kids. Explore Children's Programs →" [ref=e261] [cursor=pointer]:
            - /url: /programs/children
            - generic [ref=e264]: 🧒
            - generic [ref=e265]:
              - heading "Children's Classes" [level=3] [ref=e266]
              - paragraph [ref=e267]: Confidence, listening, discipline, respect, and friendships — the foundation for confident kids.
              - generic [ref=e268]:
                - text: Explore Children's Programs
                - generic [ref=e269]: →
        - article [ref=e270]:
          - link "Adult Classes Fitness, self-defense, stress relief, and real community for every level. Explore Adult Programs →" [ref=e271] [cursor=pointer]:
            - /url: /programs/adult
            - generic [ref=e274]: 💪
            - generic [ref=e275]:
              - heading "Adult Classes" [level=3] [ref=e276]
              - paragraph [ref=e277]: Fitness, self-defense, stress relief, and real community for every level.
              - generic [ref=e278]:
                - text: Explore Adult Programs
                - generic [ref=e279]: →
        - article [ref=e280]:
          - link "Workshops & Special Events Belt testing, tournaments, seminars, camps, and family events all year round. See Just 4 Kids →" [ref=e281] [cursor=pointer]:
            - /url: /just-4-kids
            - generic [ref=e284]: 🎉
            - generic [ref=e285]:
              - heading "Workshops & Special Events" [level=3] [ref=e286]
              - paragraph [ref=e287]: Belt testing, tournaments, seminars, camps, and family events all year round.
              - generic [ref=e288]:
                - text: See Just 4 Kids
                - generic [ref=e289]: →
    - generic [ref=e291]:
      - generic [ref=e292]:
        - generic [ref=e293]: Reviews
        - paragraph [ref=e294]: "\"My son was shy and hesitant when he started. A few months in, he walks into class with his head high and it's carried over to school too.\""
        - paragraph [ref=e295]:
          - text: Jennifer M.
          - generic [ref=e296]: — Parent of a Junior Tiger
        - paragraph [ref=e297]: Placeholder reviews · pending owner-approved testimonials
      - generic [ref=e298]:
        - figure "David R. Parent of a Tiny Tiger" [ref=e300]:
          - generic "5 out of 5 stars" [ref=e301]: ★★★★★
          - blockquote [ref=e302]: "\"The instructors genuinely care. They push the kids to try their best while keeping every class fun and positive.\""
          - generic [ref=e303]:
            - generic [ref=e304]: David R.
            - generic [ref=e305]: Parent of a Tiny Tiger
        - figure "Samantha K. Adult Program Member" [ref=e307]:
          - generic "5 out of 5 stars" [ref=e308]: ★★★★★
          - blockquote [ref=e309]: "\"I joined the adult program to get in shape and stayed for the community. Best decision I have made for my health in years.\""
          - generic [ref=e310]:
            - generic [ref=e311]: Samantha K.
            - generic [ref=e312]: Adult Program Member
    - generic [ref=e314]:
      - generic [ref=e315]:
        - generic [ref=e316]: Our Schools
        - heading "Train in Allendale & Midland Park" [level=2] [ref=e317]
        - paragraph [ref=e318]: 3 Bergen County schools — pick the campus that fits your commute, then request a free class at the location you prefer.
      - generic [ref=e319]:
        - generic [ref=e321]:
          - iframe [ref=e323]
          - generic [ref=e324]:
            - heading "Allendale" [level=3] [ref=e325]
            - paragraph [ref=e326]:
              - text: 240 W Crescent Ave
              - text: Allendale, NJ 07401
            - paragraph [ref=e327]:
              - link "201-962-2922" [ref=e328] [cursor=pointer]:
                - /url: tel:2019622922
            - generic [ref=e329]:
              - link "Visit Allendale Page" [ref=e330] [cursor=pointer]:
                - /url: /locations/allendale
              - link "Free Class" [ref=e331] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e333]:
          - iframe [ref=e335]
          - generic [ref=e336]:
            - heading "Midland Park" [level=3] [ref=e337]
            - paragraph [ref=e338]:
              - text: 644 Godwin Ave
              - text: Midland Park, NJ 07432
            - paragraph [ref=e339]:
              - emphasis [ref=e340]: Phone number and weekly hours — pending owner confirmation.
            - generic [ref=e341]:
              - link "Visit Midland Park Page" [ref=e342] [cursor=pointer]:
                - /url: /locations/midland-park
              - link "Free Class" [ref=e343] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e345]:
          - iframe [ref=e347]
          - generic [ref=e348]:
            - heading "Glen Rock New" [level=3] [ref=e349]:
              - text: Glen Rock
              - generic [ref=e350]: New
            - paragraph [ref=e351]:
              - text: 201 Rock Rd, Suite 116
              - text: Glen Rock, NJ 07452
            - paragraph [ref=e352]:
              - link "201-551-8557" [ref=e353] [cursor=pointer]:
                - /url: tel:2015518557
            - paragraph [ref=e354]:
              - emphasis [ref=e355]: Now enrolling — class schedule coming soon. Call us to reserve your spot.
            - generic [ref=e356]:
              - link "View Contact Page" [ref=e357] [cursor=pointer]:
                - /url: /contact
              - link "Free Class" [ref=e358] [cursor=pointer]:
                - /url: /contact
    - generic [ref=e360]:
      - generic [ref=e361]:
        - generic [ref=e362]: Good To Know
        - heading "Questions parents & new students ask" [level=2] [ref=e363]
      - generic [ref=e366]:
        - generic [ref=e367]:
          - button "What age can children start martial arts?" [expanded] [ref=e368] [cursor=pointer]:
            - text: What age can children start martial arts?
            - generic [ref=e369]: +
          - region "What age can children start martial arts?" [ref=e370]: Children can start as early as age 3 in our Tiny Tigers program. We also offer Junior Tigers for ages 6–10, teen classes for ages 11–17, and adult training for ages 18+.
        - button "What should students wear to their first class?" [ref=e372] [cursor=pointer]:
          - text: What should students wear to their first class?
          - generic [ref=e373]: +
        - button "Do beginners need previous experience?" [ref=e375] [cursor=pointer]:
          - text: Do beginners need previous experience?
          - generic [ref=e376]: +
        - button "Can adults begin with no martial arts background?" [ref=e378] [cursor=pointer]:
          - text: Can adults begin with no martial arts background?
          - generic [ref=e379]: +
        - button "How does the free trial work?" [ref=e381] [cursor=pointer]:
          - text: How does the free trial work?
          - generic [ref=e382]: +
        - button "Which UBBA location should I choose?" [ref=e384] [cursor=pointer]:
          - text: Which UBBA location should I choose?
          - generic [ref=e385]: +
    - generic [ref=e389]:
      - heading "Confidence starts with one class" [level=2] [ref=e390]
      - paragraph [ref=e391]: Beginners are welcome — kids, teens, and adults can start with a free class in Allendale or Midland Park. The first step is simple.
      - generic [ref=e392]:
        - link "Try A Class For Free! →" [ref=e393] [cursor=pointer]:
          - /url: /contact
          - text: Try A Class For Free!
          - generic [ref=e394]: →
        - link "Allendale" [ref=e395] [cursor=pointer]:
          - /url: /locations/allendale
        - link "Midland Park" [ref=e396] [cursor=pointer]:
          - /url: /locations/midland-park
  - contentinfo [ref=e397]:
    - img [ref=e399]
    - generic [ref=e403]:
      - generic [ref=e404]:
        - generic [ref=e405]:
          - link "United Black Belt Academy home" [ref=e406] [cursor=pointer]:
            - /url: /
            - generic [ref=e407]:
              - generic [ref=e408]: United Black Belt
              - generic [ref=e409]: Academy
          - paragraph [ref=e410]: Confidence-building Taekwondo for kids, teens, and adults across Bergen County, NJ. Discipline, respect, and real growth on every mat.
          - paragraph [ref=e411]:
            - link "info@unitedbba.com" [ref=e412] [cursor=pointer]:
              - /url: mailto:info@unitedbba.com
          - generic "Social media" [ref=e413]:
            - link "Instagram" [ref=e414] [cursor=pointer]:
              - /url: /follow-us/instagram
            - link "Facebook" [ref=e415] [cursor=pointer]:
              - /url: /follow-us/facebook
        - generic [ref=e416]:
          - heading "Explore" [level=4] [ref=e417]
          - generic [ref=e418]:
            - link "About Us" [ref=e419] [cursor=pointer]:
              - /url: /#owner
            - link "Allendale Location" [ref=e420] [cursor=pointer]:
              - /url: /locations/allendale
            - link "Midland Park Location" [ref=e421] [cursor=pointer]:
              - /url: /locations/midland-park
            - link "Reviews" [ref=e422] [cursor=pointer]:
              - /url: /#reviews
            - link "Trial Offer" [ref=e423] [cursor=pointer]:
              - /url: /contact
            - link "Children's Programs" [ref=e424] [cursor=pointer]:
              - /url: /programs/children
        - generic [ref=e425]:
          - heading "More" [level=4] [ref=e426]
          - generic [ref=e427]:
            - link "Adult Programs" [ref=e428] [cursor=pointer]:
              - /url: /programs/adult
            - link "Just 4 Kids" [ref=e429] [cursor=pointer]:
              - /url: /just-4-kids
            - link "Contact Us" [ref=e430] [cursor=pointer]:
              - /url: /contact
            - link "Privacy Policy" [ref=e431] [cursor=pointer]:
              - /url: /privacy
            - link "Terms and Conditions" [ref=e432] [cursor=pointer]:
              - /url: /terms
        - generic [ref=e433]:
          - heading "Our Schools" [level=4] [ref=e434]
          - generic [ref=e435]:
            - generic [ref=e436]:
              - strong [ref=e437]:
                - link "Allendale" [ref=e438] [cursor=pointer]:
                  - /url: /locations/allendale
              - text: 240 W Crescent Ave, Allendale, NJ 07401
              - link "201-962-2922" [ref=e439] [cursor=pointer]:
                - /url: tel:2019622922
            - generic [ref=e440]:
              - strong [ref=e441]:
                - link "Midland Park" [ref=e442] [cursor=pointer]:
                  - /url: /locations/midland-park
              - text: 644 Godwin Ave, Midland Park, NJ 07432
            - link "Try A Class For Free!" [ref=e443] [cursor=pointer]:
              - /url: /contact
      - generic [ref=e444]:
        - generic [ref=e445]: © 2026 United Black Belt Academy. All rights reserved.
        - generic [ref=e446]:
          - link "Privacy Policy" [ref=e447] [cursor=pointer]:
            - /url: /privacy
          - text: ·
          - link "Terms and Conditions" [ref=e448] [cursor=pointer]:
            - /url: /terms
  - navigation "Quick actions" [ref=e449]:
    - link "Call Allendale studio" [ref=e450] [cursor=pointer]:
      - /url: tel:2019622922
      - generic [ref=e451]: 📞
      - text: Call
    - link "Locations" [ref=e452] [cursor=pointer]:
      - /url: /#locations
      - generic [ref=e453]: 📍
      - text: Locations
    - link "Free Trial" [ref=e454] [cursor=pointer]:
      - /url: /contact
      - generic [ref=e455]: 🥋
      - text: Free Trial
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | 
  3   | test.describe('Critical marketing flows', () => {
  4   |   test('homepage exposes free-class CTA and form path', async ({ page }) => {
  5   |     await page.goto('/')
  6   |     await expect(page.getByRole('heading', { level: 1 })).toContainText(
  7   |       /united\s+black\s+belt\s+academy/i,
  8   |     )
  9   | 
  10  |     const cta = page.getByRole('link', { name: /try a class for free/i }).first()
  11  |     await expect(cta).toBeVisible()
  12  |     await cta.click()
  13  |     await expect(page).toHaveURL(/\/contact/)
  14  |     await expect(page.getByLabel(/full name/i)).toBeVisible()
  15  |     await expect(page.getByRole('button', { name: /try a class for free/i })).toBeVisible()
  16  |   })
  17  | 
  18  |   test('homepage free-class form validates and can submit against mocked API', async ({
  19  |     page,
  20  |   }) => {
  21  |     await page.route('**/api/leads', async (route) => {
  22  |       await route.fulfill({
  23  |         status: 200,
  24  |         contentType: 'application/json',
  25  |         body: JSON.stringify({ ok: true, delivered: false, mode: 'log' }),
  26  |       })
  27  |     })
  28  | 
  29  |     await page.goto('/contact')
  30  |     await page.getByLabel(/full name/i).fill('E2E Parent')
  31  |     await page.getByLabel(/^email/i).fill('e2e@example.com')
  32  |     await page.getByLabel(/^phone/i).fill('2015550100')
  33  |     await page.getByRole('button', { name: /try a class for free/i }).click()
  34  |     await expect(page.getByText(/you.?re all set/i)).toBeVisible()
  35  |   })
  36  | 
  37  |   test('mobile navigation reaches a program page', async ({ page }, testInfo) => {
  38  |     test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile nav project only')
  39  | 
  40  |     await page.goto('/')
  41  |     await page.getByRole('button', { name: /open menu/i }).click()
  42  |     await page.getByRole('button', { name: /^programs$/i }).click()
  43  |     await page.getByRole('link', { name: /tiny tigers/i }).click()
  44  |     await expect(page).toHaveURL(/\/programs\/tiny-tigers/)
  45  |     await expect(page.getByRole('heading', { level: 1, name: /tiny tigers/i })).toBeVisible()
  46  |   })
  47  | 
  48  |   test('locations section is reachable from the homepage', async ({ page }) => {
  49  |     await page.goto('/')
  50  |     await page.getByRole('navigation', { name: /primary/i }).getByRole('link', {
  51  |       name: /^locations$/i,
> 52  |     }).click()
      |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  53  |     await expect(page.locator('#locations')).toBeVisible()
  54  |     await expect(page.getByText(/allendale/i).first()).toBeVisible()
  55  |     await expect(page.getByText(/midland park/i).first()).toBeVisible()
  56  |   })
  57  | 
  58  |   test('event inquiry form submits with mocked API', async ({ page }) => {
  59  |     await page.route('**/api/leads', async (route) => {
  60  |       const body = route.request().postDataJSON() as { intent?: string }
  61  |       expect(body.intent).toBe('birthday')
  62  |       await route.fulfill({
  63  |         status: 200,
  64  |         contentType: 'application/json',
  65  |         body: JSON.stringify({ ok: true, delivered: false, mode: 'log' }),
  66  |       })
  67  |     })
  68  | 
  69  |     await page.goto('/just-4-kids/birthday-parties')
  70  |     await page.getByLabel(/parent \/ guardian name/i).fill('Sam Parent')
  71  |     await page.getByLabel(/^email/i).fill('sam@example.com')
  72  |     await page.getByLabel(/^phone/i).fill('2015559999')
  73  |     await page.getByRole('button', { name: /schedule my party/i }).click()
  74  |     await expect(page.getByText(/party request sent/i)).toBeVisible()
  75  |   })
  76  | 
  77  |   test('keyboard-only path reaches contact form', async ({ page }) => {
  78  |     await page.goto('/')
  79  |     await page.keyboard.press('Tab')
  80  |     const skip = page.getByRole('link', { name: /skip to main content/i })
  81  |     await expect(skip).toBeFocused()
  82  |     await page.keyboard.press('Enter')
  83  | 
  84  |     // Tab through header toward the primary CTA / contact path
  85  |     for (let i = 0; i < 20; i += 1) {
  86  |       await page.keyboard.press('Tab')
  87  |       const focused = page.locator(':focus')
  88  |       const text = ((await focused.textContent()) || '').toLowerCase()
  89  |       const aria = ((await focused.getAttribute('aria-label')) || '').toLowerCase()
  90  |       if (text.includes('try a class') || aria.includes('try a class')) {
  91  |         await page.keyboard.press('Enter')
  92  |         break
  93  |       }
  94  |     }
  95  | 
  96  |     await expect(page).toHaveURL(/\/contact/)
  97  |     await expect(page.getByLabel(/full name/i)).toBeVisible()
  98  |   })
  99  | })
  100 | 
```