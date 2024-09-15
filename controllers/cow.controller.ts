import CowModel from "@/models/cow.model";

export default class CowController{
    cowModel: CowModel = new CowModel();

    checkCow = (uid: string): boolean => {
        return this.cowModel.data.some(cow => cow.uid === uid)
    }

    checkIsCow = (uid: string): boolean => {
        const cow = this.cowModel.data.find(cow => cow.uid === uid);
        return cow?.udder !== 0
    }

    checkCowUdderIsPerfect = (uid: string): boolean => {
        const cow = this.cowModel.data.find(cow => cow.uid === uid);
        return cow?.udder === 4
    }

    milkingCow = (uid: string): void => {
        const cow = this.cowModel.data.find(cow => cow.uid === uid);
        
        if(cow && cow.udder === 4){
            // Generate a random number between 0 and 1
            const chance = Math.random();

            // 5% chance to reduce udderSize from 4 to 3
            if(chance <= 0.05){
                cow.udder = 3;
                console.log(`Success: The udder size of cow ${uid} has been reduced from 4 to 3.`);
            }else{
                console.log(`No change: The udder size of cow ${uid} remains the same.`);
            }

            //Calculate Milk Product
            const milk = this.calculateMilkProduction(cow.age.year, cow.age.month);
            cow.product = milk
            console.log(`Cow ${uid} produces ${milk} liters of milk.`);
        }else if(cow){
            console.log(`No change: Cow ${uid} does not have an udder size of 4.`);
        }else{
            console.log(`Cow ${uid} not found.`);
        }
    };

    calculateMilkProduction = (year: number, month: number): number => {
        return year + month;
    };

    increaseUdderSize = (uid: string): void => {
        const cow = this.cowModel.data.find(cow => cow.uid === uid);

        if(cow && cow.udder === 3){
            // Generate a random number between 0 and 1
            const chance = Math.random();

            // 20% chance to increase udder size from 3 to 4
            if(chance <= 0.20){
                cow.udder = 4;
                console.log(`Success: The udder size of cow ${uid} has been increased from 3 to 4.`);
            }else{
                console.log(`No change: The udder size of cow ${uid} remains the same.`);
            }
        }else if(cow){
            console.log(`No change: Cow ${uid} does not have an udder size of 3.`);
        }else{
            console.log(`Cow ${uid} not found.`);
        }
    };

    getMilk = (uid: string): number => {
        const cow = this.cowModel.data.find(cow => cow.uid === uid);

        if(cow){
            return cow.product
        }else{
            return 0
        }
    }
}