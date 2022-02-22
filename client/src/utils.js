export function sortAsc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].toLowerCase();
        B = b[prop].toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = Number(As[1]);
        B = Number(Bs[1]);
        if( A === B ){
            A = Number(As[0]);
            B = Number(Bs[0]);
        }
    }
    if (A < B || !B) return -1;
    if (A > B || !A) return 1;
    return 0;
}

export function sortDesc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].toLowerCase();
        B = b[prop].toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = Number(As[1]);
        B = Number(Bs[1]);
        if( A === B ){
            A = Number(As[0]);
            B = Number(Bs[0]);
        }
    }
    if (B < A || !B) return -1;
    if (B > A || !A) return 1;
    return 0;
} 

export function validate(inputs){
    const errors = {}
    const regexStr = /^([^0-9]+)\w$/i;
    if(!inputs.name){
        errors.name = "Name is required";
    }
    else if (!regexStr.test(inputs.name)){
        errors.name = "Name isn't valid";  
    }

    else if(!inputs.min_height || !inputs.max_height){
        errors.height = "Both (min and max) Height are required";
    }
    else if(Number(inputs.min_height) > Number(inputs.max_height)){
        errors.height = "Min Height can't be greater than Max Height";   
    }
    else if(Number(inputs.min_height) < 0 || Number(inputs.max_height) < 0){
        errors.height = "Min or Max Height cant be negative";   
    }

    else if(!inputs.min_weight || !inputs.max_weight){
        errors.weight = "Both (min and max) Weight are required";
    }
    else if(Number(inputs.min_weight) > Number(inputs.max_weight)){
        errors.weight = "Min Weight can't be greater than Max Weight";   
    }
    else if(Number(inputs.min_weight) < 0 || Number(inputs.max_weight) < 0){
        errors.weight = "Min or Max Weight cant be negative";   
    }

    else if(!inputs.min_life_span || !inputs.max_life_span){
        errors.life_span = "Both (min and max) Life Expectation are required";
    }
    else if(Number(inputs.min_life_span) > Number(inputs.max_life_span)){
        errors.life_span = "Min Life Span can't be greater than Max Life Span";   
    }
    else if(Number(inputs.min_life_span) < 0 || Number(inputs.max_life_span) < 0){
        errors.life_span = "Min or Max Life expectation cant be negative";   
    }    

    else if(!inputs.image){
        errors.image = "Image is required";
    }

    else if(!inputs.temperaments.length){
        errors.temperaments = "Temperaments are required";
    }
    
    return errors;
  }
