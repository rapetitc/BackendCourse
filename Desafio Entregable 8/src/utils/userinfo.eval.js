import UserManager from "../services/managers/user.mng.js"

const usersMng = new UserManager

export const evalUserInfo = async (userinfo) => {
  const keys = Object.keys(userinfo)
  let rejected = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key == 'first_name' || key == 'last_name') {
      if (userinfo[key].length < 3) rejected.push(JSON.parse(`{"${key == 'first_name' ? 'Nombre' : "Apellido"}":"Debe contener 3 caracteres o mas."}`))
    }
    if (key == 'age') {
      if (typeof userinfo[key] != 'number') rejected.push(JSON.parse(`{"Edad":"No es de tipo numero"}`))
      if (userinfo[key] < 16) rejected.push(JSON.parse(`{"Edad":"Debe contener 16 caracteres o mas."}`))
    }
    if (key == 'email') {
      if (!new RegExp('[\\w-]+@[\\w-]+\\.[\\w]{2,}', 'ug').test(userinfo[key])) rejected.push(JSON.parse(`{"Email":"No cumple con el formato."}`))
      if (await usersMng.emailExists(userinfo[key])) rejected.push(JSON.parse(`{"Email":"Ya existe"}`))
      // console.log(await  usersMng.emailExists(userinfo[key]));
    }
    if (key == 'password') {
      if (userinfo[key].length < 8) rejected.push(JSON.parse(`{"Contraseña":"Debe contener 8 caracteres o mas."}`))
      // if (!new RegExp('', '').test(userinfo[key])) console.log(userinfo[key], "Contraseña no cumple con el formato de seguridad");
    }
  }
  if (rejected.length > 0) throw new Error('User Info Format is Invalid.', { cause: rejected })
  return userinfo
}