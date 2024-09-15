"use client"

import CowController from "@/controllers/cow.controller";
import { useState } from "react";

export default function CUIDFormField(){
    const cowController = new CowController();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isCow, setIsCow] = useState<boolean>();
    const [isPerfectUdder, setIsPerfectUdder] = useState<boolean>();
    const [isMilking, setIsMilking] = useState(false);
    const [milkProduct, setMilkProduct] = useState(0);

    const validateInput = (value: string): void => {
        // Check if the value is 8 characters long, consists only of numbers, and doesn't start with 0
        const isValid = /^[1-9][0-9]{7}$/.test(value);
        if(!isValid){
            setError('รหัสวัวต้องมีความยาว 8 ตัวอักษร และต้องเป็นตัวเลขที่ไม่ขึ้นต้นด้วย 0');
        }else{
            setError('');
        }
        setInputValue(value);
    };

    const reset = (): void => {
        setInputValue('');
        setError('');
        setIsCow(undefined);
        setIsPerfectUdder(undefined);
        setIsMilking(false);
        setMilkProduct(0);
    }

    return(
        <label className="form-control w-full max-w-xs p-2">
            <div className="label">
            <span className="label-text">กรอกรหัสวัว</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-slate-50" onChange={(e) => validateInput(e.target.value)} />
            {error != '' &&
                <div className="label">
                    <span className="label-text-alt text-red-700">{error}</span>
                </div>
            }
            <button className="btn btn-neutral w-full my-2" disabled={error != ''} onClick={() => {
                if(cowController.checkCow(inputValue)){
                    if(cowController.checkIsCow(inputValue)){
                        setIsCow(true)
                        setIsPerfectUdder(cowController.checkCowUdderIsPerfect(inputValue))
                        if(!isPerfectUdder){
                            cowController.increaseUdderSize(inputValue)
                        }
                    }else{
                        setIsCow(false)
                    }
                }else{
                    setError('รหัสวัวไม่ถูกต้อง');
                }}}
            >ตรวจสอบ</button>
            {isCow != undefined &&
                <div className="text-center">
                    <img src={isCow ? isPerfectUdder ? "/images/holy_cow.jpg" : "/images/cow_sad.jpg" : "/images/goat_meme.jpg"} className="image_full_width" />
                    {!isPerfectUdder &&
                        <p className=" text-base mt-2 text-red-600 font-bold">***อาจไม่สมบูรณ์ ไม่สามารถรีดนมได้***</p>
                    }
                    {(isCow && isPerfectUdder) &&
                        <button className="btn btn-accent w-full my-2" onClick={() => {
                            cowController.milkingCow(inputValue)
                            setIsMilking(true)
                            setMilkProduct(cowController.getMilk(inputValue))
                        }}>รีดนม</button>
                    }
                    {(isMilking && milkProduct > 0) &&
                        <p className=" text-base mt-2 text-green-900 font-bold">ได้รับนม {milkProduct} ลิตร.</p>
                    }
                    {!isCow &&
                        <button className="btn btn-accent w-full my-2" onClick={() => reset()}>ขับไล่แพะ!!!</button>
                    }
                    {isMilking &&
                        <button className="btn btn-neutral w-full my-2" onClick={() => reset()}>รีเซ็ต</button>
                    }
                </div>
            }
        </label>
    )
}