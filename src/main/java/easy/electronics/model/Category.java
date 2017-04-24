package easy.electronics.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="CATEGORIES")
@Getter @Setter
public class Category implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CATEGORY_ID")
	private Long categoryId;


	@Column(name = "CATEGORY_NAME", unique = true)
	private String categoryName;

	@NotEmpty
	@Column(name="TIMES_USED")
	private Integer timesUsed;

	@NotEmpty
	@Column(name="IS_ACTIVE", nullable=false)
	private Boolean isActive;

	@OneToMany
	@JoinColumn(name="PARENT_CATEGORY_NAME", referencedColumnName = "CATEGORY_NAME")
	private List<SubCategory> subCategories;


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Category category = (Category) o;
		return Objects.equals(categoryId, category.categoryId) &&
			Objects.equals(categoryName, category.categoryName) &&
			Objects.equals(timesUsed, category.timesUsed) &&
			Objects.equals(isActive, category.isActive);
	}

	@Override
	public int hashCode() {
		return Objects.hash(categoryId, categoryName, timesUsed, isActive);
	}

	@Override
	public String toString() {
		return "Category{" +
			"categoryName='" + categoryName + '\'' +
			", timesUsed=" + timesUsed +
			", isActive=" + isActive +
			'}';
	}
}
