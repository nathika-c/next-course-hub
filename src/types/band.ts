//กำหนดโครงสร้างข้อมูลของสมาชิกในวง
export type Member = {
  id: number; //รหัสสมาชิก
  name: string;  //ชื่อสมาชิก
  role: string; //ตำแหน่ง
  imageUrl?: string; //รูปภาพ
};

//กำหนดโครงสร้างข้อมูลของวง
export type Band = {
  id: number; //รหัสวง
  name: string; //ชื่อวง
  genre: string; //ประเภท
  imageUrl?: string; //รูปภาพ
  members: Member[]; //รายชื่อสมาชิก
};