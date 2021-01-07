package br.com.erp.resources;


import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

 
@Provider
public class ObjectMapperProvider implements ContextResolver<ObjectMapper>{
	
	private ObjectMapper defaultObjectMapper; 

	@Override
	public ObjectMapper getContext(Class<?> type) {
		if (defaultObjectMapper==null) {
			defaultObjectMapper = new ObjectMapper();
			//defaultObjectMapper.registerModule(new Hibernate5Module());
			defaultObjectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
			defaultObjectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			defaultObjectMapper.setVisibility(PropertyAccessor.ALL, Visibility.ANY);
		}
		return defaultObjectMapper;
	}

}
