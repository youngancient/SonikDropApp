export interface ICSV {
    address: string;
    amount?: number | string;
}

export interface IAirdropList extends ICSV {
    id: string;
}

export interface IPoapEvent {
    eventName: string,
      eventDescription: string,
      eventType: string,
      selectedFile: any,
      tokenSymbol: string,
      JSONIPFSHash: string,
}
