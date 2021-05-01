export class ImagesModel {
    public name: string;
    public tags: string[];
    public imageUrl: string;
    constructor(public _name: string, public _tags: string[], public _imageUrl: string) {
        this.name = _name;
        this.tags = _tags;
        this.imageUrl = _imageUrl;
    }
};