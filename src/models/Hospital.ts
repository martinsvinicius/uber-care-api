import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospitals')
class Hospital {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  owner_name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  contact: string;
}

export default Hospital;
