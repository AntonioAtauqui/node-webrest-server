import express from "express"
import path from "path";


interface Options {
    port: number;
    public_path?: string;
};



export class Server {
    
    private app = express();
    private readonly port: number;
    private readonly publicpath: string;

    constructor(options: Options) {
        const { port, public_path = "public "} = options;
        this.port = port;
        this.publicpath = public_path;
    }

    async start() {

        //*Middlewares

        // * Public Folder
        this.app.use(express.static(this.publicpath));


        this.app.use("*", (req, res ) => {
            const indexPath = path.join(__dirname + `../../../${this.publicpath}/index.html`);
            res.sendFile(indexPath);
            return;
        })


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${3000}...`)
        }); 
        
    };
};