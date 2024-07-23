export class CreateServiceInput {
  title: string;
  description: string;

  price: number;
  date: Date;
  providerID: string;
  addressID?: string;
}
