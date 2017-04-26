package easy.electronics.repositories;

import easy.electronics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByFullName(String name);

	User findByUserName(String userName);

}
