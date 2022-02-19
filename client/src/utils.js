export function sortAsc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].slice(0,3).toLowerCase();
        B = b[prop].slice(0,3).toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = Number(As[1]);
        B = Number(Bs[1]);
    }
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
}

export function sortDesc (a, b, prop){
    let A;
    let B;
    if(prop === 'name'){
        A = a[prop].slice(0,3).toLowerCase();
        B = b[prop].slice(0,3).toLowerCase();
    }else if (prop === 'weight'){
        let As = a[prop].split(' - ');
        let Bs = b[prop].split(' - ');
        A = Number(As[1]);
        B = Number(Bs[1]);
    }
    if (B < A) return -1;
    if (B > A) return 1;
    return 0;
} 

export function validate(inputs){
    const errors = {}
    //const regexStr = /^([a-zA-Z]+)\w$/g;
    const regexStr = /^([^0-9]+)\w$/i;
    const regexUrl = /[a-zA-Z]+:\/\/([a-zA-Z]+(\.[a-zA-Z]+)+)/i;
    if(!inputs.name){
        errors.name = "Name is required";
    }
    else if (!regexStr.test(inputs.name)){
        errors.name = "Name is invalid";  
    }

    else if(!inputs.min_height || !inputs.max_height){
        errors.height = "Both (min and max) Height are required";
    }
    else if(Number(inputs.min_height) > Number(inputs.max_height)){
        errors.height = "Min Height can't be greater than Max Height";   
    }

    else if(!inputs.min_weight || !inputs.max_weight){
        errors.weight = "Both (min and max) Weight are required";
    }
    else if(Number(inputs.min_weight) > Number(inputs.max_weight)){
        errors.weight = "Min Weight can't be greater than Max Weight";   
    }

    else if(!inputs.min_life_span || !inputs.max_life_span){
        errors.life_span = "Both (min and max) Life Expectation are required";
    }
    else if(Number(inputs.min_life_span) > Number(inputs.max_life_span)){
        errors.life_span = "Min Life Span can't be greater than Max Life Span";   
    }
    

    else if(!inputs.image){
        errors.image = "Image URL is required";
    }
    else if(!regexUrl.test(inputs.image)){
        errors.image = "Image must be a valid URL";   
    }

    else if(!inputs.temperaments.length){
        errors.temperaments = "Temperaments is required";
    }
    
    return errors;
  }
