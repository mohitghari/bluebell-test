import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
export function requiredFileType(type: string[]): ValidatorFn {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const paths = file.split('\\');
            const fileName = paths[paths.length - 1];
            const fileNameSplits = fileName.split('.');
            const extension = fileNameSplits[fileNameSplits.length - 1];
            var isValidFile = false;
            for (let i = 0; i < type.length; i++) {    
                if (type[i].toLowerCase() === extension.toLowerCase()) {
                    isValidFile = true;
                    break;
                }
            }

            if(isValidFile){
                return null
            }else{
                return {
                    requiredFileType: 'Unknown format'
                }
            }
        }
       
    };
}