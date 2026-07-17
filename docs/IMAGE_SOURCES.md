# Image & Video Source Document

The site currently uses **free / Creative Commons placeholder media** so the design
can be evaluated with real Taekwondo imagery. Every photo shows a small
`Placeholder photo` credit in the UI. Replace these with the academy's own,
licensed photography/video before launch and update this file.

All media is referenced centrally from `IMAGES` in `src/data/site.ts`.

## Current media

| Key | Page · section | Source URL | Source / Author | License | Attribution req.? | Temporary? |
| --- | --- | --- | --- | --- | --- | --- |
| `heroVideo` | Home · hero background | https://assets.mixkit.co/videos/49706/49706-1080.mp4 | Mixkit (item 49706) | Mixkit Free Stock Video License | No | Yes |
| `heroPoster` | Home · hero poster (`/media/hero-poster.jpg`) | frame from Mixkit 49706 | Mixkit | Mixkit Free License | No | Yes |
| `instructorPortrait` | Home · owner (`/media/instructor-portrait.jpg`) | frame from Mixkit 49705 | Mixkit | Mixkit Free License | No | Yes — replace with real owner photo |
| `action` | Home/Children/Adult · story | https://upload.wikimedia.org/wikipedia/commons/0/09/Taekwondo_master_Lee_Jeong-hee_demonstrates_taekwondo_kicks_in_front_of_his_young_Indian_trainees.jpg | Wikimedia Commons | CC BY-SA | Yes | Yes |
| `kidsKicks` | Tiny Tigers, Summer Camp | https://live.staticflickr.com/5059/5516890660_22d1220112_b.jpg | Flickr | CC BY | Yes | Yes |
| `kidsGroup` | Junior Tigers, Family, feature | https://live.staticflickr.com/5172/5516911808_f34bcd539f_b.jpg | Flickr | CC BY | Yes | Yes |
| `teenSpar` | Teen, Olympic Sparring | https://live.staticflickr.com/2871/8904949904_987d764022_b.jpg | Flickr | CC BY | Yes | Yes |
| `beltTest` | Self Defense, Weapons, events | https://live.staticflickr.com/7515/27837815175_f5d455124f_b.jpg | Flickr | CC BY | Yes | Yes |

## Notes & rules

- **Attribution:** CC BY / CC BY-SA images require visible credit + a link to the
  source and license if kept. Prefer replacing them with owned photography so no
  attribution or share-alike obligations apply.
- **Owner portrait:** `instructorPortrait` is a generic stand-in — replace with a
  real photo of Sanghyun Lee (do not imply the stand-in is the owner).
- No low-resolution or watermarked images; no AI-generated people without
  disclosure; do not misrepresent Taekwondo with unrelated martial arts imagery.
- Hero video hotlinks Mixkit's CDN; the local poster (`/media/hero-poster.jpg`)
  is the fallback if the CDN is unavailable. For production, self-host the final
  video.
