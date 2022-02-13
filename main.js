const config = {
  url : "https://api.recursionist.io/builder/computers?type=",
  target :  document.getElementById("target"),


}



class PC{
  constructor(){
    this.cpuBrand = null;
    this.cpuModel = null;
   
    this.gpuBrand =null;
    this.gpuModel = null;
   
    this.ramBrand = null;
    this.ramModel = null;
   
    this.storageType = null;
    this.storageSize = null;
    this.storageBrand = null;
    this.storageModel = null;

    this.cpuBenchmark = null;
    this.gpuBenchmark = null;
    this.ramBenchmark = null;
    this.storageBenchmark = null;
  }

  static addBrand(parts, brand, pc){
    switch(parts){
      case "cpu":
        pc.cpuBrand = brand;
        break;
      case "gpu":
        pc.gpuBrand = brand;
        break;
      case "ram":
        break;
      case "hdd":
        pc.storageBrand = brand;
        break;
      case "ssd":
        pc.storageBrand = brand;
        break;
    }
  }

  static addModel(parts, model, pc){
    switch(parts){
      case "cpu":
        pc.cpuModel = model;
        break;
      case "gpu":
        pc.gpuModel = model;
        break;
      case "ram":
        break;
      case "hdd":
        pc.storageModel = model;
        break;
      case "ssd":
        pc.storageModel = model;
        break;
    }
  }

  static addStorageType(type, pc){
    pc.storageType = type;
  }

  static addStorageSize(size, pc){
    pc.storageSize = size;
  }


  static addBenchmark(parts, benchmark, pc){
      switch(parts){
        case "cpu":
          pc.cpuBenchmark = benchmark;
          break;
        case "gpu":
          pc.gpuBenchmark = benchmark;
          break;
        case "ram":
          pc.ramBenchmark = benchmark;
          break;
        case "hdd":
          pc.storageBenchmark = benchmark;
          break;
        case "ssd":
          pc.storageBenchmark = benchmark;
          break;
      }
   }


   static gamingPCscore(pc){
     let cpuScore = parseInt(pc.cpuBenchmark * 0.25);
     let gpuScore = parseInt(pc.gpuBenchmark * 0.6);
     let ramScore = parseInt(pc.ramBenchmark * 0.125);
     let storageScore = pc.storageType === "ssd" ? parseInt(pc.storageBenchmark * 0.1) : parseInt(pc.storageBenchmark * 0.025);

     return cpuScore + gpuScore + ramScore + storageScore;
   }

  static workingPCscore(pc){
     let cpuScore = parseInt(pc.cpuBenchmark * 0.6);
     let gpuScore = parseInt(pc.gpuBenchmark * 0.25);
     let ramScore = parseInt(pc.ramBenchmark * 0.1);
     let storageScore = parseInt(pc.storageBenchmark * 0.05);

     return cpuScore + gpuScore + ramScore + storageScore;
   }
}


class View{
  static createInitialPage(pc){
    let target = config.target;
    let container = document.createElement("div");
    
    container.innerHTML = 
        `
        <h4 class="p-2">step1: Select Your CPU</h4>
        <div class="d-flex">
          <div class="form-group col-5">
            <lavel>Brand</lavel>
            <select class="form-control" id="cpuBrand">
              <option class="step1BrandOption" value="">-</option>
            </select>
          </div>
          <div class="form-group col-5">
            <lavel>Model</lavel>
            <select class="form-control" id="cpuModel">
              <option value="">-</option>
            </select>
          </div>
        </div>
        <h4 class="p-2">step2: Select Your GPU</h4>
        <div class="d-flex">
          <div class="form-group col-5">
            <lavel>Brand</lavel>
            <select class="form-control" id="gpuBrand">
              <option class="step2BrandOption" value="">-</option>
            </select>
          </div>
          <div class="form-group col-5">
            <lavel>Model</lavel>
            <select class="form-control" id="gpuModel">
              <option value="">-</option>
            </select>
          </div>
        </div>

        <h4 class="p-2">step3: Select Your Memory Card</h4>
        <div class="d-flex">
          <div class="form-group col-3">
            <lavel>How many?</lavel>
            <select class="form-control" id="ramQuantity">
              <option value="">-</option>
              <option value="1x">1</option>
              <option value="2x">2</option>
              <option value="3x">3</option>
              <option value="4x">4</option>
              <option value="8x">8</option>
            </select>
          </div>
          <div class="form-group col-4">
            <lavel>Brand</lavel>
            <select class="form-control" id="ramBrand">
              <option value="">-</option>
            </select>
          </div>
          <div class="form-group col-4">
            <lavel>Model</lavel>
            <select class="form-control" id="ramModel">
              <option value="">-</option>
            </select>
          </div>
        </div>

        <h4 class="p-2">step4: Select Your Storage</h4>
      <div class="d-flex">
        <div class="form-group col-3">
          <lavel>HDD or SSD</lavel>
          <select class="form-control" id="storageType">
            <option value="">-</option>
            <option value="hdd">HDD</option>
            <option value="ssd">SSD</option>
          </select>
        </div>
        <div class="form-group col-3">
          <lavel>Strage</lavel>
          <select class="form-control" id="storageSize">
            <option value="">-</option>
          </select>
        </div>
        <div class="form-group col-3">
          <lavel>Brand</lavel>
          <select class="form-control" id="storageBrand">
            <option value="">-</option>
          </select>
        </div>
        <div class="form-group col-3">
          <lavel>Model</lavel>
          <select class="form-control" id="storageModel">
            <option value="">-</option>
          </select>
        </div>
      </div>
      <div class="p-3">
        <button class="btn btn-primary text-white col-4" id="addPC">Add PC</button>
      </div>
        `
    
    target.append(container);
    let addPC = document.querySelectorAll("#addPC")[0];
    addPC.addEventListener("click", function(){
      Controller.clickAddPC(pc);
    })
  }

  static createPCSpecsPage(count, pc){
    let target = document.querySelectorAll("#target")[0];
    let container = document.createElement("div");
    let gamingPCscore = PC.gamingPCscore(pc);
    let workingPCscore = PC.workingPCscore(pc);

    container.innerHTML =
        `
        <div class="d-flex flex-column bg-primary text-white p-3">
          <h4 class="p-3">Your PC ${count}</h4>
          <h4>CPU</h4>
          <p>Brand: ${pc.cpuBrand}</p>
          <p>Model: ${pc.cpuModel}</p>
          <h4>GPU</h4>
          <p>Brand: ${pc.gpuBrand}</p>
          <p>Model: ${pc.gpuModel}</p>
          <h4>RAM</h4>
          <p>Brand: ${pc.ramBrand}</p>
          <p>Model: ${pc.ramModel}</p>
          <h4>Storage</h4>
          <p>Disk: ${pc.storageType.toUpperCase()}</p>
          <p>Disk: ${pc.storageSize}</p>
          <p>Brand: ${pc.storageBrand}</p>
          <p>Model: ${pc.storageModel}</p>
        </div>

        <div class="d-flex flex-row justify-content-center bg-success">
          <h4 class="p-2">Gaming: ${gamingPCscore}</h4>
          <h4 class="p-2">Work: ${workingPCscore}</h4>
        </div>
        `

        target.append(container);
  }
}

class Controller{
  static count = 0;

  static startBuilding(){
    const pc = new PC();
    View.createInitialPage(pc);
    Controller.getAllData(pc);
  }

  static getAllData(pc){
    let cpuBrand = document.querySelectorAll("#cpuBrand")[0];
    let cpuModel = document.querySelectorAll("#cpuModel")[0];
    let gpuBrand = document.querySelectorAll("#gpuBrand")[0];
    let gpuModel = document.querySelectorAll("#gpuModel")[0];
    let ramBrand = document.querySelectorAll("#ramBrand")[0];
    let ramModel = document.querySelectorAll("#ramModel")[0];
    let ramQuantity = document.querySelectorAll("#ramQuantity")[0];
    let storageBrand = document.querySelectorAll("#storageBrand")[0];
    let storageModel = document.querySelectorAll("#storageModel")[0];
 

    Controller.getBrandData("cpu", cpuBrand, cpuModel, pc);
    Controller.getBrandData("gpu", gpuBrand, gpuModel, pc);
    Controller.getRamBrand(ramQuantity,ramBrand, ramModel, pc);
    Controller.getStorageData(storageBrand, storageModel, pc);
  }

  static getBrandData(parts, brandSelect, modelSelect, pc){
    fetch(config.url + parts).then(responce=>responce.json()).then(data=>{
      let brandHash = this.getBrand(data);
      brandSelect.innerHTML = `<option value="">-</option>`
      for(let brand in brandHash){
        let option = document.createElement("option");
        option.value = brandHash[brand];
        option.innerText = brandHash[brand];
        brandSelect.append(option);
      }
      brandSelect.addEventListener("change", function(){
        PC.addBrand(parts, brandSelect.value, pc);
        Controller.getModelData(parts, brandSelect, modelSelect, pc)
      })
    })
  }

  static getModelData(parts, brandSelect,modelSelect, pc){
    fetch(config.url + parts).then(responce=>responce.json()).then(data=>{
      let modelHash = Controller.getModel(data);
      if(parts === "cpu" || parts === "gpu"){
        modelSelect.innerHTML = `<option value="">-</option>`
        
        for(let i in modelHash[brandSelect.value]){
          let option = document.createElement("option");
          option.value = modelHash[brandSelect.value][i];
          option.innerText = modelHash[brandSelect.value][i];
          modelSelect.append(option);
        }
      }  
      if(parts === "ram"){
        modelSelect.innerHTML = `<option value="">-</option>`
        for(let i in modelHash[brandSelect.value]){
          if(modelHash[brandSelect.value][i].indexOf(ramQuantity.value) !== -1){
            let option = document.createElement("option");
            option.value = modelHash[brandSelect.value][i];
            option.innerText = modelHash[brandSelect.value][i];
            modelSelect.append(option);
          }
        }
      }
      if(parts === "hdd" || parts === "ssd"){
        modelSelect.innerHTML = `<option value="">-</option>`;
       
        for(let i in modelHash[brandSelect.value]){
          if(modelHash[brandSelect.value][i].indexOf(storageSize.value) !== -1){
            let option = document.createElement("option");
            option.value = modelHash[brandSelect.value][i];
            option.innerText = modelHash[brandSelect.value][i];
            modelSelect.append(option);
          }
        }
      }

      modelSelect.addEventListener("change", function(){
        PC.addModel(parts, modelSelect.value, pc);
        Controller.getBenchmarkData(parts, modelSelect.value, pc);
      })
    })
  }

  static getRamData(brandSelect, modelSelect, pc){
     let ramQuantity = document.querySelectorAll("#ramQuantity")[0];
     ramQuantity.addEventListener("chagne", function(){
      Controller.getRamBrand(brandSelect, modelSelect, pc);
     })
  }

  static getBrand(data){
    let brandHash = {};
    for(let i in data){
      let current = data[i];
      if(brandHash[current.Brand] == undefined)brandHash[current.Brand] = current.Brand;
    }
    return brandHash;
  }
  static getModel(data){
    let modelHash = {};
    for(let i in data){
      let current = data[i];
      if(modelHash[current.Brand] == undefined)modelHash[current.Brand] = [current.Model];
      else{
        modelHash[current.Brand].push(current.Model);
      }
    }
    return modelHash;
  }

  static getRamBrand(ramQuantity ,ramBrand, ramModel, pc){
    
    ramQuantity.addEventListener("change", function(){
      Controller.getBrandData("ram", ramBrand, ramModel, pc);
    })
  }

  static getStorageData(storageBrand, storageModel, pc){
    let storageType = document.querySelectorAll("#storageType")[0];
    let storageSize = document.querySelectorAll("#storageSize")[0];
    storageType.addEventListener("change", function(){
      PC.addStorageType(storageType.value, pc);
      storageBrand.innerHTML = `<option value="">-</option>`
      fetch(config.url + storageType.value).then(responce=>responce.json()).then(data=>{
        let storageSizeData = Controller.getStorageSize(data);
        storageSize.innerHTML = `<option value="">-</option>`
        for(let i in storageSizeData){
          let option = document.createElement("option");
          option.value = storageSizeData[i];
          option.innerText = storageSizeData[i];
          storageSize.append(option);
        }
      })
    })

    storageSize.addEventListener("change", function(){
      Controller.getBrandData(storageType.value, storageBrand, storageModel, pc);
      PC.addStorageSize(storageSize.value, pc);
    })

  }


  static getStorageSize(data){
      let sizeTB = [];
      let sizeGB = [];
      for(let i in data){
        let currentModel = data[i]["Model"];
        if(currentModel.indexOf("TB") !== -1){
          let storage = parseInt(currentModel.match(/\d*[TB]B/g).pop().replace("TB", ""));
          if(!sizeTB.includes(storage)){
            sizeTB.push(storage);
          }   
        }
        if(currentModel.indexOf("GB") !== -1){
          let storage = parseInt(currentModel.match(/\d*[GB]B/g).pop().replace("GB", ""));
          if(!sizeGB.includes(storage)){
            sizeGB.push(storage);
          }
        }
      }
      sizeTB.sort(
        function(a, b){
          return b - a;
        }
      );
      sizeGB.sort(
        function(a, b){
          return b - a;
        }
      );
        
      sizeTB = sizeTB.map(x => x.toString() + "TB");
      sizeGB = sizeGB.map(x => x.toString() + "GB");
      return sizeTB.concat(sizeGB);
  }

  static async getBenchmarkData(parts, model, pc){
      const res = await fetch(config.url + parts);
      const data = await res.json();
      let benchmark = Controller.getBenchmark(data, model);
      PC.addBenchmark(parts, benchmark, pc);
  }
  
  static getBenchmark(data,model){
    let benchmark = 0;
    for(let i in data){
      if(data[i]["Model"] === model){
        benchmark = parseInt(data[i]["Benchmark"]);
        break;
      }
    }
    return benchmark;
  }
  

  static clickAddPC(pc){

    let cpuBrandValue = document.querySelectorAll("#cpuBrand")[0].value;
    let cpuModelValue = document.querySelectorAll("#cpuModel")[0].value;
    let gpuBrandValue = document.querySelectorAll("#gpuBrand")[0].value;
    let gpuModelValue = document.querySelectorAll("#gpuModel")[0].value;
    let ramBrandValue = document.querySelectorAll("#ramBrand")[0].value;
    let ramModelValue = document.querySelectorAll("#ramModel")[0].value;
    let storageSizeValue = document.querySelectorAll("#storageSize")[0].value;
    let storageTypeValue = document.querySelectorAll("#storageType")[0].value;
    let storageBrandValue = document.querySelectorAll("#storageBrand")[0].value;
    let storageModelValue = document.querySelectorAll("#storageModel")[0].value;

    if(cpuBrandValue === "" || cpuModelValue === "" || gpuBrandValue === "" || gpuModelValue === "" || ramBrandValue === "" || ramModelValue === "" || storageSizeValue === "" || storageTypeValue === "" || storageBrandValue === "" || storageModelValue === ""){
     window.alert("すべてのパーツを選択してください");
    }
    else{
      this.count ++;
      
      View.createPCSpecsPage(this.count, pc);

    }
  }
}
Controller.startBuilding();





// const testPC = new Controller(3,4,5,6,7,3,2,2,34,5);

// testPC.addBenchmark("cpu" , 2232323);

// console.log(testPC.cpuBenchmark);

