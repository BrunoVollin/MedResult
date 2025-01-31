export class Exam {
  constructor(
    public id: any | null,
    public file: Buffer,
    public description: string,
    public patient_id: number,
    public laboratory_id: number,
  ) {}
}
