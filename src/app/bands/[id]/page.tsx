//หน้าเว็บแสดงรายละเอียดของแต่ละวง(ที่ผู้ใช้กด)
import Image from "next/image";
import Link from "next/link";
import { BANDS } from "@/data/bands";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BandDetailPage({ params }: Props) {
  const { id } = await params;
  const band = BANDS.find((b) => b.id === Number(id));

  if (!band) {
    notFound();
  }

  return (
    //จัดทุกอย่างให้อยู่ตรงกลาง
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      padding: "32px 16px" 
    }}>
      {/*ความกว้างการ์ด*/}
      <div style={{ width: "100%", maxWidth: "700px" }}>
        
        {/*ปุ่มกลับ*/}
        <Link 
          href="/bands" 
          style={{ 
            display: "inline-block", 
            marginBottom: "16px", 
            color: "#0066cc", 
            textDecoration: "none" 
          }}
        >
          ← Back
        </Link>

        {/* การ์ดเนื้อหา */}
        <div style={{ 
          backgroundColor: "#fff", 
          borderRadius: "16px", 
          padding: "24px", 
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" 
        }}>
          {/* จัดให้อยู่ตรงกลาง */}
          {band.imageUrl && (
            <div style={{ 
              position: "relative", 
              width: "100%", 
              height: "360px", 
              borderRadius: "12px", 
              overflow: "hidden", 
              marginBottom: "20px" 
            }}>
              <Image
                src={band.imageUrl}
                alt={band.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* รายละเอียดวง */}
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>
            {band.name}
          </h1>
          <p style={{ color: "#4b5563", marginBottom: "20px" }}>
            <strong>แนวเพลง:</strong> {band.genre}
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "16px 0" }} />

          {/* สมาชิกวง */}
<div>
  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
    สมาชิก:
  </h3>
  <ul style={{ listStyleType: "none", padding: 0, margin: 0, lineHeight: "1.8" }}>
    {band.members.map((member) => (
      <li 
        key={member.id} 
        style={{ 
          color: "#374151", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          marginBottom: "10px" 
        }}
      >
        {/* แสดงรูปภาพสมาชิก */}
        {member.imageUrl && (
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={200}
            height={300}
            style={{ borderRadius: "0.5rem", objectFit: "cover" }}
          />
        )}
        <span>{member.name} ({member.role})</span>
      </li>
    ))}
  </ul>
</div>
        </div>

      </div>
    </main>
  );
}