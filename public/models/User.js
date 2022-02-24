class User{
    constructor(user){
        this._register = new Date().toISOString().substring(0,19).replace('T',' ');
        this._id;

        for(let [key, val] of Object.entries(user)){
            key = key.split('_').join('');
            eval(`this._${key} = '${val}';`);
        }

        console.log(this);
    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }
    get name(){
        return this._name;
    }
    get gender(){
        return this._gender;
    }
    get birth(){
        return this._birth;
    }
    get country(){
        return this._country;
    }
    get email(){
        return this._email;
    }
    get photo(){
        return this._photo
    }
    set photo(val){
        this._photo = val;
    }

    get password(){
        return this._password;
    }
    get admin(){
        return this._admin;
    }

    static getUsersStorage(){
        let users = [];

        if(localStorage.getItem('localUsers')){
            users = JSON.parse(localStorage.getItem('localUsers'));
        }

        return users;
    }

    getNewId(){
        let id = 0;

        if(localStorage.getItem("usersID")){
            id = parseInt(localStorage.getItem("usersID"));
        }

        id++;
        localStorage.setItem("usersID",id);
        return id;
    }

    toJSON(){
        return Utils.removeUnderline(this);
    }

    save(){
        //let users = User.getUsersStorage();

        return new Promise((resolve, reject)=>{
            let promise = this.id > 0 ?
                Ajax.put(`/users/${this.id}`, this.toJSON()) : Ajax.post(`/users`, this.toJSON());

            promise.then(data=>{
                for(let [key, val] of Object.entries(data)){
                    key = key.split('_').join('');
                    eval(`this._${key} = '${val}';`);
                }

                resolve(this);

            }).catch(e=>{
                reject(e);
            });
        });
    }

    remove(){
        let users = User.getUsersStorage();

        users.forEach((u, i) => {
            if(u.id == this.id){
                users.splice(i, 1);//splice remove do array original. slice retorna parte do array.
            }
        });

        localStorage.setItem('localUsers', JSON.stringify(users));
    }

}