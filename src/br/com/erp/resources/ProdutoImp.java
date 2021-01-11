package br.com.erp.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.erp.json.ParamJson;
import br.com.erp.model.Produto;
import br.com.erp.util.UnidadePersistencia;

@Path("produto")
public class ProdutoImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Produto save(Produto produto) {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (produto.getId() == null) {
				System.out.println(produto.getDescricao());
				em.persist(produto);
			} else {
				em.merge(produto);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return produto;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Produto findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Produto produto = null;
		try {
			produto = em.find(Produto.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return produto;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Produto> obterTodos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		List<Produto> produtos = null;

		try {
			produtos = em.createQuery("select a from Produto a").getResultList();
			System.out.println(produtos);
		} catch (Exception e) {

		} finally {
			em.close();
		}
		return produtos;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Produto> obterTodosAtivos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			return em.createQuery("select a from Produto a where a.status = 1").getResultList();
		} catch (Exception e) {
			
		} finally {
			em.close();
		}
		return null;
	}
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Produto produto = em.find(Produto.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(produto);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}

	}
	
}
