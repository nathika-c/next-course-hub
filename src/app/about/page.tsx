export default function AboutPage() {
  const title: string = "เกี่ยวกับโปรเจกต์ Student Course Hub";
  const description: string = "web project";
  const author: string = "นางสาวณฐิกา จันทร์เสถียร รหัส 6804101319";

  const features: string[] = [
    "ค้นหาและดูรายละเอียดรายวิชาทั้งหมดในหลักสูตร",
    "ตรวจสอบจำนวนหน่วยกิตและสถานะการเปิดลงทะเบียน",
    "เรียนรู้โครงสร้างการพัฒนาเว็บแอปพลิเคชันด้วย Next.js และ TypeScript",
  ];

  return (
    <main className="page">
      <h1>{title}</h1>
      <p>{description}</p>
      <p><strong>ผู้จัดทำ:</strong> {author}</p>

      <section>
        <h2>ฟีเจอร์หลักของระบบ</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
