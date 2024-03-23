import User from "./modelsUser.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from 'jsonwebtoken';



const saltRounds = 10

async function getAllUsers(req, res) {
  try {
//     const result = await User.create({"first_name":"Elke","last_name":"Uwins","email":"euwins1@wikia.com","password":"2663217439"},)
//     console.log(result)
    const users = await User.find()
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export { getAllUsers };

// async function User(req, res) {
//   try {
    
//   } catch (error) {
//   }
// }

// export { User };


async function InfoUser(req, res) {
  try {
    const userId = req.params.userId;
    const result = await User.findOne({ _id: userId});

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Если пользователь найден, отправляем его данные в ответе
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { InfoUser };

    


async function addUsers(req, res) {
  try { 

    try {

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addUsers };



async function examUsers(req, res) {
  const { email, password } = req.body;
  
  try {
      // Находим пользователя по электронной почте
      const user = await User.findOne({ email });
      
      // Если пользователь не найден, возвращаем сообщение об ошибке
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Проверяем правильность пароля
      const isValidPassword = await bcrypt.compare(password, user.password)
      console.log('isValidPassword',isValidPassword)
      // const isValidPassword = (password===user.password);

      // Если пароль неверный, возвращаем сообщение об ошибке
      if (!isValidPassword) {
          return res.status(401).json({ success: false, message: 'Incorrect password' });
      }

      // Если пользователь найден и пароль верный, возвращаем успешный ответ
      res.status(200).json({ success: true, first_name:user.first_name, last_name:user.last_name, email:user.email });
  } catch (error) {
      // Если произошла ошибка при выполнении запроса, возвращаем сообщение об ошибке сервера
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
}
export { examUsers };



async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ where: { username: req.user.username } });
    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordCorrect) {
      return res.status(400).json({ message: 'Неверный текущий пароль' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Пароли не совпадают' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });

    res.status(200).json({ message: 'Пароль успешно изменен' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { changePassword };


async function deleteUsers(req, res) {
  try {
    // Получение ID пользователя из параметров запроса
    const userId = req.params.userId;

    // Удаление пользователя по ID
    const result = await User.deleteOne({ _id: userId });
    console.log(result);

    // Получение списка всех пользователей после удаления
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { deleteUsers };


// async function updateUsers(req, res) {
//   try {
// //     const result = await User.create({"first_name":"Elke","last_name":"Uwins","email":"euwins1@wikia.com","password":"2663217439"},
// // )
// //     console.log(result)
//     const users = await User.find()
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
// export { updateUsers };




// async function deleteUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully', deletedUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// async function updateUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const { firstName, lastName, email, password } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, email, password }, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User updated successfully', updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }