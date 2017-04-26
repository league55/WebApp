package easy.electronics.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="SUB_CATEGORIES")
@Getter
@Setter
public class SubCategory implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SUB_CATEGORY_ID")
	private Long subCategoryId;


	@Column(name = "SUB_CATEGORY_NAME", unique = true)
	private String subCategoryName;

	@Column(name = "TIMES_USED")
	private Integer timesUsed;

	@NotEmpty
	@Column(name = "IS_ACTIVE", nullable = false)
	private Boolean isActive = false;

	@NotEmpty
	@Column(name = "PARENT_CATEGORY_NAME", nullable = false)
	private String parentCategoryName;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		SubCategory that = (SubCategory) o;
		return Objects.equals(subCategoryName, that.subCategoryName) &&
			Objects.equals(timesUsed, that.timesUsed) &&
			Objects.equals(isActive, that.isActive);
	}

	@Override
	public int hashCode() {
		return Objects.hash(subCategoryName, timesUsed, isActive);
	}

	@Override
	public String toString() {
		return "SubCategory{" +
			"subCategoryName='" + subCategoryName + '\'' +
			", timesUsed=" + timesUsed +
			", isActive=" + isActive +
			", category=" + parentCategoryName +
			'}';
	}
}
