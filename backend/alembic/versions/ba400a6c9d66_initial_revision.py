"""initial revision

Revision ID: ba400a6c9d66
Revises: d60ed72d3bb8
Create Date: 2022-01-05 19:13:01.897502

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba400a6c9d66'
down_revision = 'd60ed72d3bb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('post', 'read_time',
               existing_type=sa.VARCHAR(length=32),
               type_=sa.String(length=64),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('post', 'read_time',
               existing_type=sa.String(length=64),
               type_=sa.VARCHAR(length=32),
               existing_nullable=True)
    # ### end Alembic commands ###
