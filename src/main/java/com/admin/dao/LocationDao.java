package com.admin.dao;

import java.util.List;
import java.util.Map;

public interface LocationDao {

	  List<Map> LoadProvince();

	  List<Map> LoadCity(int province_id);
}
