// component ใช้แสดงข้อมูลวง แบบการ์ด
import Image from "next/image";
import { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <article className="band-card"> 
      {band.imageUrl && (
        <div className="image-wrapper">  //แสดงรูปภาพ
          <Image
            src={band.imageUrl}
            alt={band.name}
            width={300}
            height={200}
          />
        </div>
      )}
      <h2>{band.name}</h2> //แสดงชื่อวง
      <p><strong>แนวเพลง:</strong> {band.genre}</p>  //แสดงแนวเพลง

      <div className="members-section">  
        <h3>สมาชิก:</h3>
        <ul className="members-list">
  {band.members.map((member) => (
    <li key={member.id} className="flex items-center gap-2 mb-2">
      {/* เพิ่มส่วนการแสดงรูปภาพสมาชิก */}
      {member.imageUrl && (
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={200}
          height={300}
          className="rounded-full object-cover w-10 h-10"
        />
      )}
      <span>{member.name} ({member.role})</span>
    </li>
  ))}
</ul>
      </div>
    </article>
  );
}