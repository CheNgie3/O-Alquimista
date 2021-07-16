import fs from "fs"
import path from "path"

class Storage{
    private _data:any
    private APPDATA_PATH=path.join(__dirname,'../AppData')
    private STORAGE_PATH=path.join(this.APPDATA_PATH,'./storage.json')

    constructor(){
      this._data=null
      this.checkStorage()
    }
    private readFileSync(path:string) {
      const data=fs.readFileSync(path).toString();
      console.log("readFileSync",data)
    }
    private writeFileSync(path: string, data: any={}) {
      try{
        fs.writeFileSync(path, JSON.stringify(data, undefined, 4));
      }catch(e){
        console.log("writeFileSync:",e)
      }
    }
    private checkStorage() {
        if (fs.existsSync(this.APPDATA_PATH)) {
            if(fs.existsSync(this.STORAGE_PATH)){
              this._data = this.readFileSync(this.STORAGE_PATH);
            }else{
              this.writeFileSync(this.STORAGE_PATH)
              this._data={}
            }
        }
        fs.mkdirSync(this.APPDATA_PATH);
        this.writeFileSync(this.STORAGE_PATH)
        this._data={}
    }
    get(key:string){
      return this._data[key];
    }
    set(key:string,value:any){
      this._data[key] = value;
      this.writeFileSync(this.STORAGE_PATH, this._data);
    }
    
}

export default Storage