package br.com.erp.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class UnidadePersistencia {
	
    private static final EntityManagerFactory em = Persistence.createEntityManagerFactory("erpPU");
    
    public static EntityManager createEntityManager() {
    	EntityManager entityManager = em.createEntityManager();
        return entityManager;
    }

}
