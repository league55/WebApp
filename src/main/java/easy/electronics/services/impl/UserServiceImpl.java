package easy.electronics.services.impl;

import java.util.List;

import easy.electronics.model.User;
import easy.electronics.repositories.UserRepository;
import easy.electronics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	public User findById(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public User findByUsername(String userName) {
		return userRepository.findByUserName(userName);
	}

	public User findByFullName(String name) {
		return userRepository.findByFullName(name);
	}

	public void saveUser(User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		saveUser(user);
	}

	public void deleteUserById(Long id) {
		userRepository.delete(id);
	}

	public void deleteAllUsers() {
		userRepository.deleteAll();
	}

	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	public boolean isUserExist(User user) {
		return findByUsername(user.getUserName()) != null;
	}

}
