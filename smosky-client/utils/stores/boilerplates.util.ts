import type { ISpringDependencyGroup, ISpringDependencyItem, ISpringDependencyLink, ISpringDependencyProperty,ISpringDependencyPropertyOption } from "~/types/model";

export const isDependencyExistInArray = (springDependenciesSelected : ISpringDependencyItem[] , value: string) => {
    return (
      springDependenciesSelected.findIndex(
        (item) => item.id === value
      ) !== -1
    );
  }; 


  export const saveBoilerplateFromBlob = (blob : Blob,fileName :string) =>{
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.zip`;
    a.setAttribute("download", `${fileName}.zip`);
    a.style.display = "none";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }


  export const convertJsonToSpringDependencyGroupList = (jsonData : any) : ISpringDependencyGroup[] =>{

    const springDependencyGroupList : ISpringDependencyGroup[] = [];
      jsonData.dependencies.forEach((element: any) => {
          const springDependencyGroup : ISpringDependencyGroup = {
            id:springDependencyGroupList.length+1,
            name:element.name,
            languageType:'SPRING',
            dependencies:convertJsonToSpringDependencyList(element.content)
          }
    
          springDependencyGroupList.push(springDependencyGroup)
      });
      return springDependencyGroupList;
  }

  export const convertJsonToSpringDependencyList = (jsonData : any) : ISpringDependencyItem[] =>{


    const springDependencyList : ISpringDependencyItem[] = [];
    jsonData.forEach((element: any) => {
      const compatibilityRangeNode  = element.compatibilityRange;
    let splitResult : string[] = []

    if(compatibilityRangeNode){
      let compatibilityRange : string  = compatibilityRangeNode;
      if(compatibilityRange.startsWith("[")){
        compatibilityRange = compatibilityRange.substring(1);
      }

      if(compatibilityRange.endsWith(")")){
        compatibilityRange = compatibilityRange.substring(0, compatibilityRange.length - 1);
      }
      splitResult = compatibilityRange.split(",");
      }

    const springDependency : ISpringDependencyItem = {
      id:element.id,
      name:element.name,
      description:element.description,
      compatibilityRanges:splitResult,
      links:convertJsonToSpringLinkList(element.links),
      properties:convertJsonToSpringPropertyList(element.properties),
      required:false
    }

    springDependencyList.push(springDependency);
    
    });

    return springDependencyList;
  }

  const convertJsonToSpringPropertyList = (jsonData : any) : ISpringDependencyProperty[] =>{

    const springDependencyPropertyList : ISpringDependencyProperty[] = []
    if(jsonData && Array.isArray(jsonData)){
       jsonData.forEach((element: any) =>{
          const disabled : boolean = element?.required ? true : false

          const springDependencyPropertyOptionList : ISpringDependencyPropertyOption[] = [];
          if(element?.options && Array.isArray(element.options)){

              element.options.forEach((option : any) => {
                const randomNumber = Math.floor(Math.random() * 1001);
                const springDependencyPropertyOption : ISpringDependencyPropertyOption = {
                  id:randomNumber,
                  label:option.label,
                  value:option.value
                }
                springDependencyPropertyOptionList.push(springDependencyPropertyOption)
              });
          }
          const springDependencyProperty : ISpringDependencyProperty = {
            id:element.id,
            title:element.title,
            value:element.value,
            toolTip:element.toolTip,
            isDisable:disabled,
            options:springDependencyPropertyOptionList
          }
          springDependencyPropertyList.push(springDependencyProperty);
       })
    }
    return springDependencyPropertyList

  }

  const convertJsonToSpringLinkList = (jsonData : any) : ISpringDependencyLink[] =>{
    const springDependencyLinkList : ISpringDependencyLink[] = [];
    if(jsonData && Array.isArray(jsonData)){
      jsonData.forEach((element: any) =>{
        const springDependencyLink : ISpringDependencyLink =  {
          
          name:element.rel,
          url:element.href
        }
        springDependencyLinkList.push(springDependencyLink);
      })
   
    }
    return springDependencyLinkList;
    
  }