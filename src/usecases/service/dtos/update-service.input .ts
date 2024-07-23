export class UpdateServiceInput {
  title: string;
  description: string;
  price: number;
  date: Date;
  providerID: string;
  addressID?: string;
  serviceID: string;
}
