import Address from "./value-object/address"

export default interface CustomerInterface {
      get id(): string 
    
      get name(): string 
    
      get rewardPoints(): number

      get address(): Address

      isActive(): boolean
    
      validate(): void

      set address(address: Address)
    
      changeName(name: string):void
        
      changeAddress(address: Address):void
  
      activate():void
    
      deactivate():void
    
      addRewardPoints(points: number):void
    
}