const shell = require('shelljs')
const chalk = require('chalk')

/*
	Rule name:
		no-assets-outside-assets-folder
*/

const imageExtensions = "ase,art,bmp,blp,cd5,cit,cpt,cr2,cut,dds,dib,djvu,egt,exif,gif,gpl,grf,icns,ico,iff,jng,jpeg,jpg,jfif,jp2,jps,lbm,max,miff,mng,msp,nitf,ota,pbm,pc1,pc2,pc3,pcf,pcx,pdn,pgm,PI1,PI2,PI3,pict,pct,pnm,pns,ppm,psb,psd,pdd,psp,px,pxm,pxr,qfx,raw,rle,sct,sgi,rgb,int,bw,tga,tiff,tif,vtf,xbm,xcf,xpm,3dv,amf,ai,awg,cgm,cdr,cmx,dxf,e2d,egt,eps,fs,gbr,odg,svg,stl,vrml,x3d,sxd,v2d,vnd,wmf,emf,art,xar,png,webp,jxr,hdp,wdp,cur,ecw,iff,lbm,liff,nrrd,pam,pcx,pgf,sgi,rgb,rgba,bw,int,inta,sid,ras,sun,tga"
const videoExtensions = "264,3g2,3gp,3gp2,3gpp,3gpp2,3mm,3p2,60d,787,890,aaf,aec,aecap,aegraphic,aep,aepx,aet,aetx,ajp,ale,am,amc,amv,amx,anim,anx,aqt,arcut,arf,asf,asx,av,av3,avb,avc,avchd,avd,ave,avi,avm,avp,avr,avs,avs,avv,awlive,axm,axv,bdm,bdmv,bdt2,bdt3,bik,bik2,bin,bix,bk2,blz,bmc,bmk,bnp,box,bs4,bsf,bu,bvr,byu,camproj,camrec,camv,ced,cel,cine,cip,clk,clpi,cme,cmmp,cmmtpl,cmproj,cmrec,cmv,cpi,cpvc,crec,cst,cvc,cx3,d2v,d3v,dad,dash,dat,dav,db2,dce,dck,dcr,dcr,ddat,dif,dir,divx,dlx,dmb,dmsd,dmsd3d,dmsm,dmsm3d,dmss,dmx,dnc,dpa,dpg,dream,dsy,dv,dv-avi,dv4,dvdmedia,dvr,dvr-ms,dvx,dxr,dzm,dzp,dzt,edl,evo,evo,exo,exp,eye,eyetv,ezt,f4f,f4m,f4p,f4v,fbr,fbr,fbz,fcarch,fcp,fcproject,ffd,ffm,flc,flh,fli,flic,flv,flx,fpdx,ftc,fvt,g2m,g64,g64x,gcs,gfp,gifv,gl,gom,grasp,gts,gvi,gvp,gxf,h264,hdmov,hdv,hevc,hkm,ifo,imovielibrary,imoviemobile,imovieproj,imovieproject,inp,insv,int,ircp,irf,ism,ismc,ismclip,ismv,iva,ivf,ivr,ivs,izz,izzy,jdr,jmv,jnr,jss,jts,jtv,k3g,kdenlive,kmv,ktn,lrec,lrv,lsf,lsx,lvix,m15,m1pg,m1v,m21,m21,m2a,m2p,m2t,m2ts,m2v,m4e,m4u,m4v,m75,mani,meta,mgv,mj2,mjp,mjpeg,mjpg,mk3d,mkv,mmv,mnv,mob,mod,modd,moff,moi,moov,mov,movie,movie,mp21,mp21,mp2v,mp4,mp4.infovid,mp4v,mpe,mpeg,mpeg1,mpeg2,mpeg4,mpf,mpg,mpg2,mpg4,mpgindex,mpl,mpl,mpls,mproj,mpsub,mpv,mpv2,mqv,msdvd,mse,msh,mswmm,mt2s,mts,mtv,mvb,mvc,mvd,mve,mvex,mvp,mvp,mvy,mxf,mxv,mys,n3r,ncor,nfv,nsv,ntp,nut,nuv,nvc,ogm,ogv,ogx,orv,osp,otrkey,pac,par,pds,pgi,photoshow,piv,pjs,playlist,plproj,pmf,pmv,pns,ppj,prel,pro,pro4dvd,pro5dvd,proqc,prproj,prtl,psb,psh,pssd,psv,pva,pvr,pxv,pz,qt,qtch,qtindex,qtl,qtm,qtz,r3d,ravi,rcd,rcproject,rcrec,rcut,rdb,rec,rm,rmd,rmd,rmp,rms,rmv,rmvb,roq,rp,rsx,rts,rts,rum,rv,rvid,rvl,san,sbk,sbt,sbz,scc,scm,scm,scn,screenflow,sdv,sec,sec,sedprj,seq,ser,sfd,sfera,sfvidcap,siv,smi,smi,smil,smk,sml,smv,snagproj,spl,sqz,srt,ssf,ssm,stl,str,stx,svi,swf,swi,swt,tda3mt,tdt,tdx,theater,thp,tid,tivo,tix,tod,tp,tp0,tpd,tpr,trec,trp,ts,tsp,tsv,ttxt,tvlayer,tvrecording,tvs,tvshow,usf,usm,v264,vbc,vc1,vcpf,vcr,vcv,vdo,vdr,vdx,veg,vem,vep,vf,vft,vfw,vfz,vgz,vid,video,viewlet,viv,vivo,vix,vlab,vmlf,vmlt,vob,vp3,vp6,vp7,vpj,vr,vro,vs4,vse,vsh,vsp,vtt,w32,wcp,webm,wfsp,wgi,wlmp,wm,wmd,wmmp,wmv,wmx,wot,wp3,wpl,wsve,wtv,wvm,wvx,wxp,xej,xel,xesc,xfl,xlmv,xml,xmv,xvid,y4m,yog,yuv,zeg,zm1,zm2,zm3,zmv"
const fontExtensions = "abf,acfm,afm,amfm,bdf,cha,chr,compositefont,dfont,eot,etx,euf,f3f,fea,ffil,fnt,fon,fot,gdr,gf,glif,gxf,lwfn,mcf,mf,mxf,nftr,odttf,otf,pcf,pfa,pfb,pfm,pfr,pk,pmt,sfd,sfp,suit,t65,tfm,ttc,tte,ttf,txf,ufo,vfb,vlw,vnf,woff,woff2,xfn,xft,ytf"

const extensionsStr = (imageExtensions + ',' + videoExtensions + ',' + fontExtensions)
	.split(',').join('|')

module.exports = (rootPath, assetsFolderPath) => {
	const findCmd = `find -E ${rootPath} -type f `
		+ `-iregex '.*\.(${extensionsStr})$' `
		+ `-not -path "${assetsFolderPath}/*" `
		+ `-not -path "*/node_modules/*" `
	// console.log(findCmd)

	const result = shell.exec(findCmd, { silent: true })

	if (result.stdout.length > 0) {
		console.log(chalk.red('𐄂 Rule violation: no-assets-outside-assets-folder'))
		console.log('  Files needs to be reviewed:')
		console.log(result.stdout.trim().split('\n').map(line => "  - " + chalk.blue(line.replace(rootPath + '/', ''))).join('\n'))
		console.log('')
		return false
	}
	else {
		console.log(chalk.green('✓') + ' Passed for rule: no-assets-outside-assets-folder')
		console.log('')
		return true
	}
}
