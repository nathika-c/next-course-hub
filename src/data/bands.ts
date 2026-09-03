// ข้อมูลวงดนตรี 
import { Band } from "@/types/band";
export const BANDS: Band[] = [
  {
    id: 1,
    name: "LITTLE JOHN",
    genre: "Rock / Hard Rock / Metal",
    imageUrl: "/image/little-john.jpg",
    members: [
      { id: 101, name: "กัลยกร แก้วกระจ่าง (โอ๊ค)", role: "Vocal",
        imageUrl: "/image/little/โอ๊ค little.jpg"
       },
      { id: 102, name: "ชิติพัทธ์ ไสไทย (ปอนด์)", role: "Guitar",
        imageUrl: "/image/little/ปอร์น little.jpg"
       },
      { id: 103, name: "จิณณวัตร คันศร (แฟ้ม)", role: "Guitar",
        imageUrl: "/image/little/แฟ้ม little.jpg"
       },
      { id: 104, name: "ฐณาณัฏฐ์ วุฒิอนันต์ชัย (มิว)", role: "Bass",
        imageUrl: "/image/little/มิว little.jpg"
       },
      { id: 105, name: "ธนา วิภาตะพันธุ์ (มีน)", role: "Drums",
        imageUrl: "/image/little/มีน little.jpg"
       }
    ]
  },
  {
    id: 2,
    name: "PURPEECH",
    genre: "Indie Pop / Vintage Synth-Pop",
    imageUrl: "/image/purpeech.jpg",
    members: [
      { id: 201, name: "ศราวุฒิ สุยะเขต (เรฟ)", role: "Vocal",
        imageUrl: "/image/purpeech/เรฟ purp.jpg"
       },
      { id: 202, name: "ภูริช สมชื่อ (ยีนส์)", role: "Keyboard",
        imageUrl: "/image/purpeech/ยีนส์ purp.jpg"
       },
      { id: 203, name: "สิทธิโชค ตาสา (เซ้นต์)", role: "Guitar",
        imageUrl: "/image/purpeech/เซนต์ purp.jpg"
       },
      { id: 204, name: "ทรรศนะ เพ็ญจันทร์ (คอมพ์)", role: "Bass",
        imageUrl: "/image/purpeech/คอมพ์ purp.jpg"
       },
      { id: 205, name: "จักรพรรณ ธนาศุภณัฏฐ์ (เจมส์)", role: "Drums",
        imageUrl: "/image/purpeech/เจมส์ purp.jpg"
       }
    ]
  },
  {
    id: 3,
    name: "THEREE MAN DOWN",
    genre: "Pop-Rock / T-POP",
    imageUrl: "/image/theree-man-down.jpg",
    members: [
      { id: 301, name: "กฤตย์ จีรพัฒนานุวงศ์ (กิต)", role: "Vocal",
        imageUrl: "/image/theree/กิต theree.jpg"
       },
      { id: 302, name: "พีรพล เอี่ยมจำรัส (ตูน)", role: "Guitar",
        imageUrl: "/image/theree/ตูน theree.jpg"
       },
      { id: 303, name: "เตธนันท์ วงศ์ปรีชาโชค (เต)", role: "Drums",
        imageUrl: "/image/theree/เต theree.jpg"
       },
      { id: 304, name: "วิศรุต ปฐมศิริไพศาล (เส็ง)", role: "Keyboard / Synthesizer",
        imageUrl: "/image/theree/เส็ง theree.jpg"
       }
    ]
  }
];