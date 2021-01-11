package br.com.erp.model;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.sun.istack.NotNull;

@Entity
public class Produto {
	
		//CAMPOS
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "ID")
	    private Integer id;
	 	
	 	@NotNull
	    @Column(length = 100, name = "DESCRICAO")
		private String descricao;
	    
	 	@NotNull
	    @Column(name = "QUANTIDADE_MINIMA")
		private Integer quantidadeMinima;
	    
	 	@NotNull
	    @Column(name = "QUANTIDADE_MAXIMA")
		private Integer quantidadeMaxima;
	    
	 	@NotNull
	    @Column(name = "QUANTIDADE_ATUAL")
		private Integer quantidadeAtual;
	    
	 	@NotNull
	    @Column(name = "PRECO_CUSTO")
		private Float precoCusto;
	    
	 	@NotNull
	    @Column(name = "PRECO_VENDA")
		private Float precoVenda;
	    
	 	@NotNull
		@Column(length = 1, name = "STATUS")
		private Integer status;

	    @Transient
		private String descStatus;
		
	    //RELAÇÕES
	    @ManyToOne
	    @JoinColumn(name = "COR_ID", referencedColumnName = "ID")
	    @NotNull
	    private Cor cor;
	    
	    @ManyToOne
	    @JoinColumn(name = "MARCA_ID", referencedColumnName = "ID")
	    @NotNull
	    private Marca marca;
	    
	    @ManyToOne
	    @JoinColumn(name = "TAMANHO_ID", referencedColumnName = "ID")
	    @NotNull
	    private Tamanho tamanho;
	    
	    @ManyToOne
	    @JoinColumn(name = "UNIDADE_DE_MEDIDA_ID", referencedColumnName = "ID")
	    @NotNull
	    private UnidadeDeMedida unidadeDeMedida;
	    
	    //METODOS
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getDescricao() {
			return descricao;
		}
		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
		public Integer getStatus() {
			return status;
		}
		public void setStatus(Integer status) {
			this.status = status;
		}
		
		public String getDescStatus() {
			if(Objects.nonNull(status)) {
				if(status.equals(0)) {
					return "INATIVO";
				}else {
					return "ATIVO";
				}
			}
			return descStatus;
		}
		public void setDescStatus(String descStatus) {
			this.descStatus = descStatus;
		}
		public Cor getCor() {
			return cor;
		}
		public void setCor(Cor cor) {
			this.cor = cor;
		}
		public Marca getMarca() {
			return marca;
		}
		public void setMarca(Marca marca) {
			this.marca = marca;
		}
		public Tamanho getTamanho() {
			return tamanho;
		}
		public void setTamanho(Tamanho tamanho) {
			this.tamanho = tamanho;
		}
		public UnidadeDeMedida getUnidadeDeMedida() {
			return unidadeDeMedida;
		}
		public void setUnidadeDeMedida(UnidadeDeMedida unidadeDeMedida) {
			this.unidadeDeMedida = unidadeDeMedida;
		}
}
