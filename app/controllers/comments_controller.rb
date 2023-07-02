class CommentsController < ApplicationController

    # def show
    #     post = Post.find(params[:post_id])
    #     comments = post.comments
    #     render json: comments
    # end

    def new
        post = Post.find(params[:post_id])
        @comment = post.comments.build
    end

    def index
        @post = Post.find(params[:post_id])
        comments = @post.comments

        # render json: comments

        respond_to do |format|
            format.json { render json: comments }
            # 以下でcomments/index.html.hamlを表示
            format.html { render 'comments/index'}
        end
    end

    def create
        post = Post.find(params[:post_id])
        @comment = post.comments.build(comment_params)
        @comment.save!

        render json: @comment
    end

    private
    def comment_params
        params.require(:comment).permit(:content)
    end
end